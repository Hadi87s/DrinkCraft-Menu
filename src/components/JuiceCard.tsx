import { motion } from "framer-motion";
import { Sparkles, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface JuiceCardProps {
  juice: {
    name: string;
    id: number;
    image: string;
  };
  onOrder: (orderId: number) => void;
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.3 }
  }
};

export default function JuiceCard({ juice, onOrder }: JuiceCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-b from-background to-accent/20">
        <CardHeader className="p-0 relative">
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <motion.img
              src={juice.image}
              alt={juice.name}
              className="w-full h-full object-cover"
              variants={imageVariants}
              whileHover="hover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-3 right-3"
            >
              <Badge
                variant="secondary"
                className="bg-white/90 text-foreground"
              >
                Fresh
              </Badge>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <CardTitle className="text-xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {juice.name}
          </CardTitle>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                onClick={() => onOrder(juice.id)}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                size="lg"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2"
                >
                  Order Now
                  <Plus className="w-4 h-4" />
                </motion.span>
              </Button>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                onClick={() => onOrder(juice.id + 3)}
                variant="outline"
                className="w-full border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                size="lg"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  With Chocolate Chips
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
