module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@components": "./src/core/presentation/components",
          "@constants": "./src/shared/constants",
          "@core": "./src/core",
          "@data": "./src/core/data",
          "@entities": "./src/core/domain/entities",
          "@graphql": "./src/core/data/graphql",
          "@hooks": "./src/core/presentation/hooks",
          "@i18n": "./src/shared/i18n",
          "@repositories": "./src/core/domain/repositories",
          "@styles": "./src/core/presentation/styles",
          "@theme": "./src/shared/theme",
          "@use-cases": "./src/core/domain/use-cases",
          "@utils": "./src/shared/utils",
          "@view-models": "./src/core/presentation/view-models",
          "@test": "./__test__",
        },
      },
    ],
  ],
};
