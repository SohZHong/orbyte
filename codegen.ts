import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema:
    'https://api.studio.thegraph.com/query/90479/orbyte-celo/version/latest',
  documents: ['apps/**/src/graphql/**/*.graphql'],
  generates: {
    'apps/web/src/generated/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
    },
    'apps/server/src/generated/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
