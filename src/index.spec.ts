import "cross-fetch/polyfill";
import { compose } from "throwback";
import { cors } from "./index";
import { finalHandler } from "@borderless/fetch-final-handler";

describe("fetch cors", () => {
  it("should set origin", async () => {
    const app = compose<Request, Response>([
      cors(),
      (req) => new Response(req.method, { status: 200 }),
    ]);

    const req = new Request("/");
    const res = await app(req, finalHandler());

    expect(res.status).toEqual(200);
    expect(res.headers.get("Access-Control-Allow-Origin")).toEqual("*");
    expect(await res.text()).toEqual("GET");
  });

  it("should handle options", async () => {
    const app = compose([cors()]);

    const req = new Request("/", { method: "options" });
    const res = await app(req, finalHandler());

    expect(res.status).toEqual(204);
    expect(res.headers.get("Access-Control-Allow-Origin")).toEqual("*");
    expect(res.headers.get("Access-Control-Allow-Methods")).toEqual(
      "GET,HEAD,PUT,PATCH,POST,DELETE"
    );
    expect(await res.text()).toEqual("");
  });

  it("should forward options", async () => {
    const app = compose<Request, Response>([
      cors({ optionsContinue: true }),
      (req) => {
        return new Response(req.method, { status: 200 });
      },
    ]);

    const req = new Request("/", { method: "options" });
    const res = await app(req, finalHandler());

    expect(res.status).toEqual(200);
    expect(res.headers.get("Access-Control-Allow-Origin")).toEqual("*");
    expect(res.headers.get("Access-Control-Allow-Methods")).toEqual(
      "GET,HEAD,PUT,PATCH,POST,DELETE"
    );
    expect(await res.text()).toEqual("OPTIONS");
  });
});
