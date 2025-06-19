import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";
import { Button } from "./ui/button";

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  juiceId: number;
  onOrder: (orderId: number, toppingMode: number) => void;
}

const toppingOptions = [
  { label: "1: Both (before and after)", value: 1 },
  { label: "2: Before only", value: 2 },
  { label: "3: After only", value: 3 },
  { label: "4: No Toppings", value: 4 }
];

export function OrderDialog({
  open,
  onOpenChange,
  juiceId,
  onOrder
}: OrderDialogProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selected) {
      onOrder(juiceId, selected);
      onOpenChange(false);
      setSelected(null); // reset
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose the topping mode</DialogTitle>
          <DialogDescription>Select how you'd like the toppings applied.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          {toppingOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={selected === opt.value ? "default" : "outline"}
              onClick={() => setSelected(opt.value)}
              className="w-full"
            >
              {opt.label}
            </Button>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!selected}>
            Confirm Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
