import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

export default function PageWrapper() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      <Outlet />
    </motion.div>
  );
}
