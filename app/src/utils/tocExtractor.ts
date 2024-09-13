import * as cheerio from "cheerio";

interface TocItem {
  id: string;
  text: string;
  name: string;
}

export const extractToc = (htmlContent: string): TocItem[] => {
  const $ = cheerio.load(htmlContent);
  const headings = $("h1, h2, h3").toArray();
  const toc = headings.map((data, index) => {
    let id = data.attribs.id;
    if (!id) {
      id = `heading-${index}`;
      data.attribs.id = id;
    }
    const tagName = data.tagName || data.name || "";

    return {
      text: $(data).text(),
      id: id,
      name: tagName,
    };
  });
  return toc;
};
