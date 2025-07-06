import { CREEM_PRODUCT_CONFIG, CREEM_PRODUCTS } from '../../constants/creemProducts';
import { useRecharge } from '../../hooks/usePoints';

const CREEM_PACKAGES = [
  {
    key: 'studio_120min',
    name: 'Studio Pack',
    desc: '120 minutes AI video processing',
    product_id: CREEM_PRODUCTS.studio_120min,
    price: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.studio_120min]!.price,
    minutes: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.studio_120min]!.minutes,
    popular: true,
  },
  {
    key: 'creator_45min',
    name: 'Creator Pack',
    desc: '45 minutes AI video processing',
    product_id: CREEM_PRODUCTS.creator_45min,
    price: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.creator_45min]!.price,
    minutes: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.creator_45min]!.minutes,
    popular: false,
  },
  {
    key: 'pro_15min',
    name: 'Pro Pack',
    desc: '15 minutes AI video processing',
    product_id: CREEM_PRODUCTS.pro_15min,
    price: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.pro_15min]!.price,
    minutes: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.pro_15min]!.minutes,
    popular: false,
  },
  {
    key: 'starter_5min',
    name: 'Starter Pack',
    desc: '5 minutes AI video processing',
    product_id: CREEM_PRODUCTS.starter_5min,
    price: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.starter_5min]!.price,
    minutes: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.starter_5min]!.minutes,
    popular: false,
  },
  {
    key: 'payg_2min',
    name: 'Pay-as-you-go',
    desc: '2 minutes AI video processing',
    product_id: CREEM_PRODUCTS.payg_2min,
    price: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.payg_2min]!.price,
    minutes: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.payg_2min]!.minutes,
    popular: false,
  },
];

type RechargeOptionsProps = {
  className?: string;
};

export default function RechargeOptions({ className = '' }: RechargeOptionsProps) {
  const { recharge, loading, error } = useRecharge();

  const handleRecharge = async (product_id: string) => {
    try {
      await recharge(product_id);
    } catch (err) {
      console.error('Recharge error:', err);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose a Package</h3>
        <p className="text-sm text-gray-600">Purchase a package to get corresponding AI video processing minutes</p>
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CREEM_PACKAGES.map(pkg => (
          <button
            key={pkg.key}
            type="button"
            onClick={() => handleRecharge(pkg.product_id)}
            disabled={loading}
            className={`relative p-4 border-2 rounded-lg transition-all duration-200 ${
              pkg.popular
                ? 'border-blue-500 bg-blue-50 hover:bg-blue-100'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {pkg.popular && (
              <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Recommended
              </span>
            )}
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {pkg.name}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                {pkg.desc}
              </div>
              <div className="text-xl font-bold text-blue-600 mb-1">
                $
                {pkg.price}
              </div>
              <div className="text-xs text-gray-400">
                {pkg.minutes}
                {' '}
                min
              </div>
            </div>
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center text-sm text-gray-500">
          Redirecting to payment page...
        </div>
      )}
    </div>
  );
}
