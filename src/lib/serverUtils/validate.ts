export const contractValidate = (data: any) => {
  
    if (!data) {
      return { error: 'No data provided' }
    }
    if (!data.contractId) {
      return { error: 'Contract ID is required' }
    }
    if (!data.contractUrl) {
      return { error: 'Contract URL is required' }
    }
  
    // Validate buyer details
    if (!data.buyer) {
      return { error: 'Buyer details are required' }
    }
    if (!data.buyer.name) {
      return { error: 'Buyer name is required' }
    }
    if (!data.buyer.email) {
      return { error: 'Buyer email is required' }
    }
    if (!data.buyer.phoneNumber) {
      return { error: 'Buyer phone number is required' }
    }
    if (!data.buyer.address) {
      return { error: 'Buyer address is required' }
    }
    if (!data.buyer.Account) {
      return { error: 'Buyer account number is required' }
    }
    if (!data.buyer.ifsc) {
      return { error: 'Buyer IFSC code is required' }
    }
  
    // Validate seller details
    if (!data.seller) {
      return { error: 'Seller details are required' }
    }
    if (!data.seller.name) {
      return { error: 'Seller name is required' }
    }
    if (!data.seller.email) {
      return { error: 'Seller email is required' }
    }
    if (!data.seller.phoneNumber) {
      return { error: 'Seller phone number is required' }
    }
    if (!data.seller.address) {
      return { error: 'Seller address is required' }
    }
    if (!data.seller.Account) {
      return { error: 'Seller account number is required' }
    }
    if (!data.seller.ifsc) {
      return { error: 'Seller IFSC code is required' }
    }
  
    // Validate product details
    if (!data.product) {
      return { error: 'Product details are required' }
    }
    if (!data.product.name) {
      return { error: 'Product name is required' }
    }
    if (!data.product.quantity) {
      return { error: 'Product quantity is required' }
    }
    if (!data.product.price) {
      return { error: 'Product price is required' }
    }
    if (!data.product.totalPrice) {
      return { error: 'Product total price is required' }
    }
  
    // Validate terms
    if (!data.terms) {
      return { error: 'Contract terms are required' }
    }
    if (!data.terms.paymentTerms) {
      return { error: 'Payment terms are required' }
    }
    if (!data.terms.deliveryDate) {
      return { error: 'Delivery date is required' }
    }
    if (!data.terms.deliveryLocation) {
      return { error: 'Delivery location is required' }
    }
  
    return { error: null }
  }