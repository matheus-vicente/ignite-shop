import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { formatCurrency } from "../../utils/format";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  if (isFallback) return <h1>Loading...</h1>;

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} height={480} width={520} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>

        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        price: formatCurrency(price.unit_amount / 100),
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
