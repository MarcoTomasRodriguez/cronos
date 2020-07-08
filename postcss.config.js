const IS_PRODUCTION = process.env.NODE_ENV === "production";

const PURGECSS_CONF = {
    // Specify the paths to all of the template files in your project
    content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],

    // make sure css reset isnt removed on html and body
    whitelist: ["html", "body"],

    // Include any special characters you"re using in this regular expression
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
};

const CSSNANO_CONF = {
    preset: "default",
};

module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        ...(IS_PRODUCTION
            ? {
                  "@fullhuman/postcss-purgecss": PURGECSS_CONF,
                  cssnano: CSSNANO_CONF,
              }
            : {}),
    },
};
