import { motion } from "framer-motion";
import JuiceCard from "./JuiceCard";
import { GlassWater, Droplets } from "lucide-react";
import { toast } from "sonner";

const juices = [
  {
    name: "Fruit Punch",
    id: 1,
    image:
      "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Pineapple Juice",
    id: 2,
    image:
      "https://images.unsplash.com/photo-1607644536940-6c300b5784c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Watermelon Juice",
    id: 3,
    image:
      "https://images.unsplash.com/photo-1683531658992-b78c311900a3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Fruit Punch Pineapple Flavor",
    id: 4,
    image:
      "https://images.unsplash.com/photo-1665582513044-376da77ebec0?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Fruit Punch Watermelon Flavor",
    id: 5,
    image:
      "https://images.unsplash.com/photo-1652780201271-cbf3f4541c0d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Pineapple + Watermelon",
    id: 6,
    image:
      "https://images.unsplash.com/photo-1514994960127-ed3ef9239d11?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Mix It All",
    id: 7,
    image:
      "https://images.unsplash.com/photo-1583577612013-4fecf7bf8f13?q=80&w=966&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
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
  const handleOrder = async (orderId: number, toppingMode: number) => {
    try {
      toast("Your delicious juice is being prepared!");
      console.log(`Order ID: ${orderId}, Topping Mode: ${toppingMode}`);

      await fetch(`http://192.168.137.189/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: orderId, toppings: toppingMode })
      });

      const isTopping = toppingMode !== 4;
      const juiceName = juices.find((j) => j.id === orderId)?.name || "Juice";

      toast(
        `Your ${juiceName}${
          isTopping ? " with your chosen toppings" : ""
        } will be ready soon!`
      );
    } catch (e) {
      console.error(e);
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
          {juices.map((juice) => (
            <JuiceCard key={juice.id} juice={juice} onOrder={handleOrder} />
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
