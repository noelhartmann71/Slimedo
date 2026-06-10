import { MasterCardIcon } from "../../../components/svg-container/SvgContainer";
import ProfileDashboardLayout from "../components/ProfileDashboardLayout";
import { EditIcon, PlusIcon, TrashIcon } from "../components/ProfileIcons";
import { ProfileIdentityHeader } from "../components/ProfileWidgets";

export default function ProfilePaymentMethodsPage() {
  return (
    <ProfileDashboardLayout activeSection="payment-methods" showActions={false}>
      <div className="flex flex-col gap-6">
        <ProfileIdentityHeader />

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="flex-1 text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-accent-foreground">
            Saved Payment Methods
          </p>
          <button
            type="button"
            className="inline-flex h-12.5 items-center gap-2 rounded-[10px] bg-primary px-6 text-[16px] font-medium leading-6 text-white transition-colors hover:bg-sage"
          >
            <PlusIcon className="h-4.5 w-4.5" />
            Add New Card
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 rounded-[10px] border border-neutral-200 bg-white px-5 py-6">
          <div className="flex h-10.75 w-15 items-center justify-center rounded-sm border border-[#f3f4f6] bg-white">
            <MasterCardIcon />
          </div>

          <div className="hidden h-6.75 w-px bg-neutral-200 sm:block" />

          <div className="min-w-50 flex-1">
            <p className="text-[16px] font-medium leading-6 text-accent-foreground">
              **** **** **** 4582
            </p>
            <p className="mt-1 text-[14px] font-normal leading-5 text-muted-foreground">
              Expires: 12/2027
            </p>
            <p className="text-[14px] font-normal leading-5 text-muted-foreground">
              Billing: John Doe
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              className="inline-flex h-12.5 items-center gap-2 rounded-[10px] bg-neutral-200 px-4 text-[16px] font-medium leading-6 text-primary transition-colors hover:bg-[#dce4e2]"
            >
              <EditIcon className="h-4.5 w-4.5" />
              Edit
            </button>
            <button
              type="button"
              className="inline-flex h-12.5 items-center gap-2 rounded-[10px] bg-[#fef2f2] px-4 text-[16px] font-medium leading-6 text-[#ef4444] transition-colors hover:bg-[#fee7e7]"
            >
              <TrashIcon className="h-4.5 w-4.5" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </ProfileDashboardLayout>
  );
}
