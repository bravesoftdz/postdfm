import * as ast2dfm from "@postdfm/ast2dfm";
import * as dfm2ast from "@postdfm/dfm2ast";
import * as path from "path";
import postdfm, { ITransformer } from "../../src";

describe("postdfm", () => {
  describe("options", () => {
    test("valid (normal)", () => {
      const parser = dfm2ast.parse;
      const stringifier = ast2dfm.stringify;
      const transformers: ITransformer[] = [ast => ast];

      postdfm();
      postdfm({ parser });
      postdfm({ stringifier });
      postdfm({ transformers });
      postdfm({ parser, stringifier });
      postdfm({ parser, transformers });
      postdfm({ stringifier, transformers });
      postdfm({ parser, stringifier, transformers });
    });

    test("valid (using strings)", () => {
      const parser = path.join(__dirname, "parser.js");
      const stringifier = path.join(__dirname, "stringifier.js");
      const transformers = [path.join(__dirname, "transformer.js")];

      postdfm();
      postdfm({ parser });
      postdfm({ stringifier });
      postdfm({ transformers });
      postdfm({ parser, stringifier });
      postdfm({ parser, transformers });
      postdfm({ stringifier, transformers });
      postdfm({ parser, stringifier, transformers });
    });

    test("invalid", () => {
      const parser = true;
      const stringifier = 5;
      const transformer1 = {};
      const transformer2 = [5];

      expect(() => postdfm({ parser } as any)).toThrowError(
        /parser must be a string or a function/
      );
      expect(() => postdfm({ stringifier } as any)).toThrowError(
        /stringifier must be a string or a function/
      );
      expect(() => postdfm({ transformers: transformer1 } as any)).toThrowError(
        /transformers must be an array of strings and\/or functions/
      );
      expect(() => postdfm({ transformers: transformer2 } as any)).toThrowError(
        /transformers must be an array of strings and\/or functions/
      );
    });
  });
});