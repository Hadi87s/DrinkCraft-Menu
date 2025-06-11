import { motion } from "framer-motion";
import JuiceCard from "./JuiceCard";
import { GlassWater, Droplets } from "lucide-react";
import { toast } from "sonner";

const juices = [
  { name: "Pineapple Juice", id: 1 },
  { name: "Blueberry Juice", id: 2 },
  { name: "Watermelon Juice", id: 3 }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function OrderPage() {
  const handleOrder = async (orderId: number) => {
    try {
      // Show loading toast
      toast("Your delicious juice is being prepared!");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, we'll just show success without actual API call
      const isTopping = orderId > 3;
      const juiceName =
        juices.find((j) => j.id === (isTopping ? orderId - 3 : orderId))
          ?.name || "Juice";

      toast(
        `Your ${juiceName}${
          isTopping ? " with Chocolate Chips" : ""
        } will be ready soon!`
      );

      // Uncomment this for actual ESP32 communication:
      // await fetch('http://<ESP32_IP>/order', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ order: orderId })
      // });
    } catch {
      toast("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20 py-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={headerVariants} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <GlassWater className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-orange-500 bg-clip-text text-transparent">
              Fresh Juice Bar
            </h1>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Droplets className="w-8 h-8 text-blue-500" />
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Experience the perfect blend of fresh fruits and premium
            ingredients. Choose your favorite juice and make it extraordinary
            with our special toppings!
          </motion.p>
        </motion.div>

        <motion.div
          variants={gridVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {juices.map(({ name, id }) => (
            <JuiceCard
              key={id}
              juiceName={name}
              orderId={id}
              onOrder={handleOrder}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-muted-foreground">
            Made with love using the freshest ingredients • Delivered directly
            to your cup
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
