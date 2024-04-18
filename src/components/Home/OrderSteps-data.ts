type OrderStepsTypes = {
  id: string;
  header: string;
  paragraph: string;
  icon: iconPath;
};

type iconPath = "/Images/icon1.svg" | "/Images/icon2.svg" | "/Images/icon3.svg";

export const OrderStepsData: OrderStepsTypes[] = [
  {
    id: "1",
    header: "1. CHOOSE",
    paragraph:
      "Select food, which you want now the most and do not forget about drinks",
    icon: "/Images/icon1.svg",
  },
  {
    id: "2",
    header: "2. MAKE AN ORDER",
    paragraph:
      "Contact us and provide our agent with correct information about your order",
    icon: "/Images/icon2.svg",
  },
  {
    id: "3",
    header: "3. RECEIVE",
    paragraph: "Get your order as quickly as possible and enjoy your meal",
    icon: "/Images/icon3.svg",
  },
];
