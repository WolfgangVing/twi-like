
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, currentUser } from '@clerk/nextjs/server'

import { db } from "@/lib/db";

export async function POST(req: Request) {

    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local")
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    //If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400
        })
    }

    //Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    //Create a new SVIX instance with your secret;
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    //Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-signature": svix_signature,
            "svix-timestamp": svix_timestamp
        }) as WebhookEvent
    } catch (err) {
        console.error("Error verifying webhook", err);
        return new Response("Error ocurried", {
            status: 400
        });
    }

    // Get the ID and type
    const { id } = evt.data;
    const eventType = evt.type;

    // console.log("Webhook:", JSON.stringify(payload));
    // console.log("email_addresses", payload.data.email_addresses[0])
    if (eventType === "user.created") {
        try {
            const result = await db.user.create({
                data: {
                    externalUserId: payload.data.id,
                    username: payload.data.username,
                    imageUrl: payload.data.image_url,
                    email: payload.data.email_addresses[0]["email_address"]
                },
            });
        } catch (err) {
            console.error("An error occurred while saving in database", err)
            return new Response("Error ocurried", {
                status: 400
            })
        }

    }

    if (eventType === "user.updated") {
        try {
            const result = await db.user.findUnique({
                where: {
                    externalUserId: payload.data.id
                }
            });

            if (!currentUser) {
                return new Response("User not found", { status: 404 });
            };

            await db.user.update({
                where: {
                    externalUserId: payload.data.id,
                },
                data: {
                    username: payload.data.username,
                    imageUrl: payload.data.image_url
                },
            });
        } catch (err) {
            console.error("An error occurred while saving in database", err)
            return new Response("Error ocurried", {
                status: 400
            })
        }
    }

    if (eventType === "user.deleted") {
        try {
            await db.user.delete({
                where: {
                    externalUserId: payload.data.id
                }
            })
        } catch (err) {
            console.error("Error occurred while delete accounting", err)
            return new Response("Error", {
                status: 404
            })
        }
    }
    return new Response("", { status: 200 });
}