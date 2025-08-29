export interface TokenAttribute {
  trait_type: string;
  value: string;
}

export interface TokenMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Record<string, TokenAttribute>[];
  documents: Record<string, string>;
}
