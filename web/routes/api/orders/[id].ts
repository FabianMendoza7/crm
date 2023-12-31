import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const headers = new Headers();
    const token = getCookies(req.headers).auth;
    const customerId = ctx.params.id;
    const body = await req.json();

    const resp = await fetch(
      `${Deno.env.get("API_URL")}/api/orders/${customerId}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${token}`,
          Origin: Deno.env.get("WEB_URL") ?? "",
        },
      },
    );

    if (resp.status != 201) {
      console.log(">> Error al guardar!");
    }

    headers.set("location", "/orders/list");
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
