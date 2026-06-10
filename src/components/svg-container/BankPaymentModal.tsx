import { useMutation } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BankPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | number;
}

interface BankPaymentFormValues {
  currency: string;
  purpose: string;
  counterpart_name: string;
  counterpart_iban: string;
  bank_name: string;
  counterpart_bic: string;
}

export default function BankPaymentModal({
  isOpen,
  onClose,
  orderId,
}: BankPaymentModalProps) {
  const form = useForm<BankPaymentFormValues>({
    defaultValues: {
      currency: "EUR",
      purpose: "Usual",
      counterpart_name: "",
      counterpart_iban: "",
      bank_name: "",
      counterpart_bic: "",
    },
  });

  const { mutate: payWithBank, isPending } = useMutation({
    mutationFn: async (values: BankPaymentFormValues) => {
      const response = await axiosSecure.post("/payment/bank", {
        order_id: orderId,
        ...values,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Banküberweisung erfolgreich initiiert");
      onClose();
    },
    onError: (error) => {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      toast.error(
        axiosError?.response?.data?.message || "Fehler bei der Verarbeitung der Banküberweisung",
      );
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Banküberweisungsdetails
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((v) => payWithBank(v))}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Währung</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="EUR" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verwendungszweck</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Normal" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="counterpart_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name des Empfängers</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Vollständiger Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="counterpart_iban"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IBAN</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="DE..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bank_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bankname</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Bankname" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="counterpart_bic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BIC</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="BIC Code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full cursor-pointer"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Banküberweisung bestätigen
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
