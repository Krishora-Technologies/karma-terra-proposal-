import { useState } from "react";
import {
  X,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Truck,
  HeartHandshake,
  Star,
  Plus,
  Minus,
  Check,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  sizes?: string[];
  selectedSize?: string;
  badge: string;
  icon: string;
  color: string;
}

const PRODUCTS: Product[] = [
  {
    id: "p-diapers-pant",
    name: "Mummagodi Feather-Soft Diaper Pants",
    tagline: "360° Breathable Cloud Waistband • 12h Overnight Protection",
    price: 799,
    originalPrice: 999,
    rating: 4.9,
    reviews: 1420,
    sizes: ["NB (0-5kg)", "S (4-8kg)", "M (7-12kg)", "L (9-14kg)", "XL (12-17kg)"],
    selectedSize: "M (7-12kg)",
    badge: "Bestseller",
    icon: "👶",
    color: "#E0F2FE",
  },
  {
    id: "p-wipes-water",
    name: "99% Pure Water Bamboo Baby Wipes",
    tagline: "Organic Aloe + Vitamin E • 3x Thicker Soft Texture",
    price: 349,
    originalPrice: 449,
    rating: 4.95,
    reviews: 890,
    sizes: ["Pack of 3 (216 wipes)", "Pack of 6 (432 wipes)"],
    selectedSize: "Pack of 3 (216 wipes)",
    badge: "Doctor Approved",
    icon: "🌿",
    color: "#DCFCE7",
  },
  {
    id: "p-tape-diaper",
    name: "Newborn Snug-Fit Tape Diapers",
    tagline: "With Umbilical Cord Cut-Out • Zero Red Mark Promise",
    price: 649,
    originalPrice: 849,
    rating: 4.88,
    reviews: 620,
    sizes: ["Newborn (<5kg, 48 pcs)", "Small (4-8kg, 44 pcs)"],
    selectedSize: "Newborn (<5kg, 48 pcs)",
    badge: "For Newborns",
    icon: "🧸",
    color: "#FEF3C7",
  },
  {
    id: "p-hamper-gift",
    name: "Mummagodi Welcome Baby Hamper",
    tagline: "Diaper Pack + Pure Wipes + Natural Rash Balm + Free Gift Box",
    price: 1299,
    originalPrice: 1799,
    rating: 5.0,
    reviews: 310,
    badge: "Ultimate Value",
    icon: "🎁",
    color: "#FCE7F3",
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShopModal({ isOpen, onClose }: Props) {
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [selectedSizes, setSelectedSizes] = useState<{ [id: string]: string }>({
    "p-diapers-pant": "M (7-12kg)",
    "p-wipes-water": "Pack of 3 (216 wipes)",
    "p-tape-diaper": "Newborn (<5kg, 48 pcs)",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = PRODUCTS.reduce(
    (sum, p) => sum + (cart[p.id] || 0) * p.price,
    0
  );

  const handleAddToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCart({});
      onClose();
    }, 2800);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(6px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FFFFFF",
          borderRadius: 24,
          width: "100%",
          maxWidth: 620,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
          animation: "modalFadeIn 220ms ease-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#F8FAFC",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                padding: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/mummagodi-pfp.png"
                alt="Mummagodi"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 17,
                  color: "#0F172A",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>Mummagodi Essentials Shop</span>
                <span
                  style={{
                    background: "#E0F2FE",
                    color: "#0284C7",
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 999,
                    fontWeight: 700,
                  }}
                >
                  Official Store
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#64748B" }}>
                Comfort for Every Little One • Tested & Certified Safe
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "50%",
              width: 34,
              height: 34,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748B",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Benefits bar */}
        <div
          style={{
            background: "#F0F9FF",
            padding: "8px 24px",
            display: "flex",
            justifyContent: "space-around",
            fontSize: 11.5,
            fontWeight: 600,
            color: "#0369A1",
            borderBottom: "1px solid #BAE6FD",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Truck size={14} /> Free Express Delivery
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <ShieldCheck size={14} /> Zero-Rash Guarantee
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <HeartHandshake size={14} /> 50,000+ Happy Mums
          </span>
        </div>

        {/* Product list */}
        <div
          style={{
            padding: 20,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {orderPlaced ? (
            <div
              style={{
                padding: "48px 20px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: "50%",
                  background: "#DCFCE7",
                  color: "#16A34A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                }}
              >
                <Check size={36} strokeWidth={3} />
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#0F172A",
                  margin: 0,
                }}
              >
                Order Placed Successfully! 🎉
              </h3>
              <p
                style={{
                  color: "#64748B",
                  fontSize: 14,
                  maxWidth: 380,
                  margin: 0,
                }}
              >
                Thank you for choosing Mummagodi! Your baby essentials will be
                dispatched within 24 hours. A tracking link has been sent.
              </p>
            </div>
          ) : (
            PRODUCTS.map((prod) => {
              const qty = cart[prod.id] || 0;
              return (
                <div
                  key={prod.id}
                  style={{
                    border: "1.5px solid #E2E8F0",
                    borderRadius: 16,
                    padding: 16,
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    background: "#FFFFFF",
                    transition: "border-color 150ms ease, box-shadow 150ms ease",
                  }}
                  className="hover:border-sky-300 hover:shadow-sm"
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 14,
                      background: prod.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 36,
                      flexShrink: 0,
                    }}
                  >
                    {prod.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          background: "#EFF6FF",
                          color: "#2563EB",
                          padding: "2px 6px",
                          borderRadius: 4,
                        }}
                      >
                        {prod.badge}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          fontSize: 11,
                          color: "#D97706",
                          fontWeight: 600,
                        }}
                      >
                        <Star size={12} fill="#D97706" />
                        <span>{prod.rating}</span>
                        <span style={{ color: "#94A3B8" }}>
                          ({prod.reviews})
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#0F172A",
                        marginBottom: 2,
                      }}
                    >
                      {prod.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#64748B",
                        marginBottom: 8,
                      }}
                    >
                      {prod.tagline}
                    </div>

                    {/* Size selector if available */}
                    {prod.sizes && (
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          flexWrap: "wrap",
                          marginBottom: 10,
                        }}
                      >
                        {prod.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() =>
                              setSelectedSizes((s) => ({ ...s, [prod.id]: sz }))
                            }
                            style={{
                              fontSize: 11,
                              padding: "3px 8px",
                              borderRadius: 6,
                              border:
                                selectedSizes[prod.id] === sz
                                  ? "1.5px solid #25A4D9"
                                  : "1px solid #CBD5E1",
                              background:
                                selectedSizes[prod.id] === sz
                                  ? "#F0F9FF"
                                  : "#FFFFFF",
                              color:
                                selectedSizes[prod.id] === sz
                                  ? "#0284C7"
                                  : "#475569",
                              fontWeight:
                                selectedSizes[prod.id] === sz ? 700 : 500,
                              cursor: "pointer",
                            }}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{ display: "flex", alignItems: "baseline", gap: 6 }}
                      >
                        <span
                          style={{
                            fontSize: 18,
                            fontWeight: 800,
                            color: "#0F172A",
                          }}
                        >
                          ₹{prod.price}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            color: "#94A3B8",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹{prod.originalPrice}
                        </span>
                      </div>

                      {qty > 0 ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            background: "#F8FAFC",
                            border: "1px solid #CBD5E1",
                            borderRadius: 8,
                            padding: "3px 8px",
                          }}
                        >
                          <button
                            onClick={() => handleUpdateQty(prod.id, -1)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 2,
                              color: "#475569",
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: 13,
                              minWidth: 16,
                              textAlign: "center",
                            }}
                          >
                            {qty}
                          </span>
                          <button
                            onClick={() => handleUpdateQty(prod.id, 1)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 2,
                              color: "#475569",
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(prod.id)}
                          style={{
                            background: "#25A4D9",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: 8,
                            padding: "6px 14px",
                            fontSize: 12.5,
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            boxShadow: "0 2px 6px rgba(37, 164, 217, 0.28)",
                          }}
                        >
                          <Plus size={14} /> Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Checkout CTA */}
        {!orderPlaced && (
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid #E2E8F0",
              background: "#F8FAFC",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 12, color: "#64748B" }}>
                {totalItems} item{totalItems === 1 ? "" : "s"} selected
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#0F172A" }}>
                ₹{totalPrice}
              </div>
            </div>

            <button
              disabled={totalItems === 0}
              onClick={handleCheckout}
              style={{
                background: totalItems > 0 ? "#25A4D9" : "#CBD5E1",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 12,
                padding: "12px 24px",
                fontSize: 14,
                fontWeight: 700,
                cursor: totalItems > 0 ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow:
                  totalItems > 0 ? "0 4px 12px rgba(37, 164, 217, 0.35)" : "none",
                transition: "all 150ms ease",
              }}
            >
              <ShoppingBag size={18} />
              <span>Proceed to Checkout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
