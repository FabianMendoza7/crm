import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import Layout from "../../components/Layout.tsx";
import EditProduct from "../../islands/products/EditProduct.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const id = ctx.params.id;
    const token = getCookies(req.headers).auth;
    const resp = await fetch(`${Deno.env.get("WEB_URL")}/api/products/${id}`, {
      method: "GET",
      headers: {
        Cookie: `auth=${token}`,
      },
    });

    if (resp.status === 404) {
      return ctx.render(null);
    }

    const data = await resp.json();

    return await ctx.render(data);
  },
};

export default function Edit({ data }: PageProps) {
  const { product } = data;
  return (
    <Layout
      showOptions={true}
    >
      <EditProduct
        data={product}
        apiUrl={Deno.env.get("API_URL") ?? ""}
      />
    </Layout>
  );
}
