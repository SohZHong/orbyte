import { graphUrl } from '@/config';
import { GraphQLClient } from 'graphql-request';

export const graphClient = new GraphQLClient(graphUrl);
