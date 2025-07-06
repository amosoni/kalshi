import { useRecharge } from '../../hooks/usePoints';

type RechargeButtonProps = {
  product_id: string;
  className?: string;
  children?: React.ReactNode;
};

export default function RechargeButton({ product_id, className = '', children }: RechargeButtonProps) {
  const { recharge, loading, error: _error } = useRecharge();

  const handleRecharge = async () => {
    try {
      await recharge(product_id);
    } catch (err) {
      console.error('Recharge error:', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleRecharge}
      disabled={loading}
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? 'Redirecting...' : children || `Recharge Points`}
    </button>
  );
}
