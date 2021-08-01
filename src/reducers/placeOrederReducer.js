import {
  CONSUME_MORE_ITEMS,
  PLACE_ORDER_SELECTED_ITEMS,
  PROCEED_TO_BILLING,
  LEAVE_AND_RESET,
  PROCEED_TO_BILLING_RELOAD,
  CONSUME_ITEMS_RELOAD,
} from "../actionTypes/placeOrderActionTypes";

const foodMenu = {
  Veg: [
    {
      id: "1",
      name: "Starters",
      position: "0",
      menuItems: [
        {
          id: "201",
          name: "Beetroot and peanut Kebab",
          position: 1,
          description:
            "[6 Pcs] Savour the flavours of handpicked fresh beetroots and roasted peanuts with a subtle hint of spices. These royal beetroot kebabs are crisp on the outside and soft on the inside",
          images: [],
          price: "150.00",
        },
        {
          id: "202",
          name: "Veggie Manchurian",
          position: 1,
          description:
            "Manchurian dumplings and vegetables tossed in soya chilli sauce.",
          images: [],
          price: "150.00",
        },
      ],
    },
    {
      id: "2",
      name: "Biryani",
      position: "0",
      menuItems: [
        {
          id: "301",
          name: "Subz-E-Biryani",
          position: 19,
          description:
            "Served with Mint Raita Adorned with fresh vegetables, golden-hued long-grain basmati, & the coveted Behrouz spice mix, this dish will lend you an experience unlike any other.",
          images: [],
          price: "1550.00",
        },
        {
          id: "302",
          name: "Zaikedaar Paneer",
          position: 19,
          description:
            "Served with Mint Raita] In this extravagant dish, soft & crumbly, fresh paneer is marinated with exquisite royal spices & layered with basmati to create a dish that is as delectable as it is extravagant.",
          images: [],
          price: "1550.00",
        },
        {
          id: "303",
          name: "Subz-E-Falafel",
          position: 19,
          description:
            "Served with Mint Raita] Crafted to gently lift your spirits, this biryani is dum-pukht with long fragrant rice layered with fresh vegetables & crispy falafel tikkis",
          images: [],
          price: "1550.00",
        },
        {
          id: "304",
          name: "Paneer Biryani",
          position: 19,
          description:
            "Paneer biryani is an Indian dish made with paneer, basmati rice, spices & herbs. This paneer biryani is unique, flavorful & amazingly delicious.",
          images: [],
          price: "1550.00",
        },
      ],
    },
  ],
  nonVeg: [
    {
      id: "3",
      name: "Starters",
      position: "0",
      menuItems: [
        {
          id: "401",
          name: "Murgh Koobideh",
          position: 1,
          description:
            " Ground chicken flavored with cardamom & green chilli and grilled to perfection. Murgh Koobideh is a dish which used to be savored by the King and his subjects alike.",
          images: [],
          price: "250.00",
        },
        {
          id: "402",
          name: "Murgh Kefta",
          position: 1,
          description:
            "9 Pcs, Minced chicken kebabs cooked into soft delicious meatballs served with Minty dip.",
          images: [],
          price: "250.00",
        },
      ],
    },
    {
      id: "4",
      name: "Biryani",
      position: "0",
      menuItems: [
        {
          id: "501",
          name: "Lazeez Bhuna Murgh",
          position: 10,
          description:
            "Boneless, Served with 1 Gulab Jamun & Mint Raita] In this culinary jewel from Behrouz, Tender chicken pieces are marinated with exuberant bhuna spices that are freshly ground and dum pukht with aromatic rice.",
          images: [],
          price: "385.00",
        },
        {
          id: "502",
          name: "Dum Gosht Biryani",
          position: 10,
          description:
            "Boneless, Served with Mint Raita In this most enigmatic & treasured recipe of Behrouz, immaculately spiced fresh, succulent mutton pieces are layered with basmati & then slow-cooked on a charcoal fire..",
          images: [],
          price: "385.00",
        },
        {
          id: "503",
          name: "Murgh Tikka Biryani",
          position: 10,
          description:
            "Boneless, Served with  Mint Raita A potpourri of extravagant flavours, tender chicken spiced with freshly ground Behrouz masala is charcoal-grilled then layered with fragrant basmati & dum-pukht in its full glory.",
          images: [],
          price: "385.00",
        },
        {
          id: "504",
          name: "Chicken Biryani",
          position: 10,
          description:
            "A delightful preparation of richly flavored aromatic rice layered with marinated chicken pieces in a delicate blend of whole spices.",
          images: [],
          price: "385.00",
        },
        {
          id: "505",
          name: "Mutton Biryani",
          position: 10,
          description:
            "A delightful preparation of slow-cooked aromatic rice layered with marinated mutton pieces in a delicate blend of whole spices.",
          images: [],
          price: "385.00",
        },
      ],
    },
  ],
  Dessert: [
    {
      id: "26576",
      name: "Starters",
      position: "0",
      menuItems: [
        {
          id: "94298",
          name: "3 Chicken Wings",
          position: 1,
          description: "Tender, Spicy and Juicy. Original or Peri-Crusted",
          images: [],
          price: "250.00",
        },
      ],
    },
  ],
};

export const placeOrderReducer = (
  state = {
    foodMenu: foodMenu,
    selectedMenuItems: [],
    selectedItems: [],
    billingItems: [],
    openTableModal: false,
    openProceedToBillingModal: false,
    openMenuScreen: true,
    openPdfScreen: false,
    disableProceedToBillButton: true,
  },
  action
) => {
  switch (action.type) {
    case PLACE_ORDER_SELECTED_ITEMS:
      return {
        ...state,
        billingItems: action.payload.billingItems,
        selectedMenuItems: action.payload.selectedMenuItems,
        openTableModal: true,
        openMenuScreen: false,
        openProceedToBillingModal: false,
        openPdfScreen: false,
        disableProceedToBillButton: false,
      };

    case CONSUME_MORE_ITEMS:
      return {
        ...state,
        selectedMenuItems: action.payload,
        openTableModal: false,
        openProceedToBillingModal: false,
        openMenuScreen: true,
        openPdfScreen: false,
      };

    case PROCEED_TO_BILLING:
      return {
        ...state,
        openProceedToBillingModal: true,
        openMenuScreen: false,
        openTableModal: false,
        openPdfScreen: false,
      };

    case PROCEED_TO_BILLING_RELOAD:
      return {
        ...state,
        billingItems: action.billingItems,
        disableProceedToBillButton: false,
      };

    case CONSUME_ITEMS_RELOAD:
      return {
        ...state,
        billingItems: action.payload.billingItems,
        selectedMenuItems: action.payload.consumeItems,
        openTableModal: true,
        openMenuScreen: false,
        openProceedToBillingModal: false,
        openPdfScreen: false,
        disableProceedToBillButton: action.payload.disableProceedToBillButton,
      };

    case LEAVE_AND_RESET:
      return {
        ...state,
        changeScreen: false,
        foodMenu: foodMenu,
        selectedMenuItems: [],
        selectedItems: [],
        billingItems: [],
        openTableModal: false,
        openProceedToBillingModal: false,
        openMenuScreen: true,
        openPdfScreen: false,
        disableProceedToBillButton: true,
      };

    default:
      return state;
  }
};
