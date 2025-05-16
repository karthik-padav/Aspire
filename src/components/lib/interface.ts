export interface ICardTransaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  currency: string;
  description: string;
  action: string;
  transType?: string;
}

export interface ICardDetails {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: number;
  cardType: string;
  status: string;
}
