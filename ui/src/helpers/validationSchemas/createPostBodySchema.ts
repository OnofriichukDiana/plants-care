import * as yup from "yup";

const createPostBodySchema = yup.object({
  tags: yup
    .string()
    .required("Tags are required")
    .test(
      "has-hashtags",
      "Each symbol after a gap must start with '#'",
      (value) => {
        const symbols = value.split(/\s+/);
        return symbols.every((symbol) => symbol.startsWith("#"));
      }
    ),
});
export default createPostBodySchema;
