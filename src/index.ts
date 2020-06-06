export interface Options {
  origin?: string;
  expose?: string | string[] | false;
  methods?: string | string[] | false;
  headers?: string | string[] | false;
  maxAge?: number;
  credentials?: boolean;
  optionsContinue?: boolean;
  optionsStatus?: number;
}

const DEFAULT_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

/**
 * Process requests as CORS.
 */
export function cors(options: Options = {}) {
  return async function (
    req: Request,
    next: () => Promise<Response>
  ): Promise<Response> {
    let res: Response;

    if (req.method.toLowerCase() === "options") {
      if (options.optionsContinue) {
        res = await next();
      } else {
        res = new Response(null, { status: options.optionsStatus || 204 });
      }

      const allowMethodsHeader =
        options.methods === false
          ? ""
          : stringify(options.methods) || DEFAULT_METHODS;
      const allowHeadersHeader =
        options.headers === false
          ? ""
          : stringify(options.headers) ||
            req.headers.get("Access-Control-Request-Headers");

      if (allowMethodsHeader) {
        res.headers.set("Access-Control-Allow-Methods", allowMethodsHeader);
      }

      if (allowHeadersHeader) {
        res.headers.set("Access-Control-Allow-Headers", allowHeadersHeader);
      }

      if (typeof options.maxAge === "number") {
        res.headers.set("Access-Control-Max-Age", String(options.maxAge));
      }
    } else {
      res = await next();
    }

    const allowOrigin = options.origin || "*";
    const exposeHeader =
      options.expose === false ? "" : stringify(options.expose);

    res.headers.set("Access-Control-Allow-Origin", allowOrigin);

    if (exposeHeader) {
      res.headers.set("Access-Control-Expose-Headers", exposeHeader);
    }

    if (options.credentials) {
      res.headers.set("Access-Control-Allow-Credentials", "true");
    }

    if (allowOrigin !== "*") {
      const vary = res.headers.get("Vary");
      res.headers.set("Vary", vary ? `${vary},Origin` : "Origin");
    }

    return res;
  };
}

/**
 * Input value to a string.
 */
function stringify(value: undefined | string | string[]): string {
  return Array.isArray(value) ? value.join(",") : value || "";
}
