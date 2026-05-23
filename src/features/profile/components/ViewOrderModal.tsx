import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface OrderDetails {
  patient: {
    id: number;
    dosage: string;
    bmi: string;
    status: string;
    exclusion_criteria_note: string | null;
  };
  latest_order: {
    order_id: string;
    order_status: string;
    payment_status: string;
    total_amount: string;
    discount_amount: string;
    due_amount: string;
    shipping: boolean;
    pharmacy_type: string;
  };
}

interface ViewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: OrderDetails | null;
}

export default function ViewOrderModal({
  isOpen,
  onClose,
  orderDetails,
}: ViewOrderModalProps) {
  if (!orderDetails) return null;

  const { patient, latest_order } = orderDetails;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-white rounded-lg p-0 overflow-hidden">
        <div className="bg-[#4A645D] p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Order Details
            </DialogTitle>
            <p className="text-sm opacity-90">ID: #{latest_order.order_id}</p>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Patient Details Section */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-[#1B433B] flex items-center gap-2">
              <span className="h-5 w-1 bg-[#4A645D] rounded-full" />
              Patient Details
            </h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  BMI
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {patient.bmi}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  Dosage
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {patient.dosage}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  Status
                </p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    patient.status === "Pending"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {patient.status}
                </span>
              </div>
              {patient.exclusion_criteria_note && (
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    Note
                  </p>
                  <p className="text-sm text-gray-700 italic">
                    "{patient.exclusion_criteria_note}"
                  </p>
                </div>
              )}
            </div>
          </section>

          <Separator />

          {/* Order Summary Section */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-[#1B433B] flex items-center gap-2">
              <span className="h-5 w-1 bg-[#4A645D] rounded-full" />
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900 capitalize">
                    {latest_order.order_status}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase">
                    Order Status
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-gray-900 capitalize">
                    {latest_order.payment_status}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase">
                    Payment
                  </span>
                </div>
              </div>

              <div className="space-y-2 px-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    €{latest_order.total_amount}
                  </span>
                </div>
                {parseFloat(latest_order.discount_amount) > 0 && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span>Discount</span>
                    <span>-€{latest_order.discount_amount}</span>
                  </div>
                )}
                <div className="pt-2 border-t flex justify-between items-center">
                  <span className="text-lg font-bold text-[#1B433B]">
                    Total Due
                  </span>
                  <span className="text-xl font-black text-[#1B433B]">
                    €{latest_order.due_amount}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="text-[10px] text-gray-500 uppercase font-bold">
                Pharmacy
              </p>
              <p className="text-sm font-medium text-gray-900">
                {latest_order.pharmacy_type}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="text-[10px] text-gray-500 uppercase font-bold">
                Shipping
              </p>
              <p className="text-sm font-medium text-gray-900">
                {latest_order.shipping ? "Standard Delivery" : "Collection"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#1B433B] text-white text-sm font-bold hover:bg-[#14322c] transition-colors"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
