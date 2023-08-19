import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useGetProductByIdQuery } from '@/redux/features/product/productApiSlice';
import { IProduct } from '@/types/globalTypes';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();

  const { data } = useGetProductByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000,
  });

  const product: IProduct = data?.data;

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.name}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>
          <ul className="space-y-1 text-lg">
            {product?.features?.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button>Add to cart</Button>
        </div>
      </div>
      <ProductReview id={id as string} comments={data?.data?.comments} />
    </>
  );
}
