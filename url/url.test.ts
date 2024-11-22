import { describe, expect, test } from "vitest";
import { getUrl, shortUrl } from "./url";

describe("short url", () => {
  test("get short url mush get original url", async () => {
    const shortenUrl = await shortUrl({ url: "www.test.com" });
    const resp = await getUrl({ id: shortenUrl.id });
    console.log(resp);
    expect(resp.url).toBe("www.test.com");
  });
});
