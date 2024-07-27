import { defineStore } from 'pinia';
import { fetchApi } from '@/utils/fetchApi';

export const usePaymentStore = defineStore('paymentStore', {
  state: () => ({
    payments: [],
    payment: null,
  }),

  actions: {
    async fetchPaymentById(id) {
      try {
        const response = await fetchApi(`/payment/${id}`, {
          method: 'GET',
        });
        this.payment = await response.json();
      } catch (error) {
        console.error('Error fetching payment by id:', error);
      }
    },

    async updatePayment(id, paymentData) {
      try {
        const response = await fetchApi(`/payment/${id}`, {
          method: 'PUT',
          body: JSON.stringify(paymentData),
          headers: {
            'Content-Type': 'application/json-patch+json',
          },
        });
        if (response.ok) {
          console.log('Payment updated successfully');
        }
      } catch (error) {
        console.error('Error updating payment:', error);
      }
    },

    async deletePayment(id) {
      try {
        const response = await fetchApi(`/payment/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('Payment deleted successfully');
          this.payments = this.payments.filter(payment => payment.id !== id);
        }
      } catch (error) {
        console.error('Error deleting payment:', error);
      }
    },

    async fetchAllPayments(range = '') {
      try {
        const response = await fetchApi(`/payment/all${range ? `?range=${range}` : ''}`, {
          method: 'GET',
        });
        this.payments = await response.json();
      } catch (error) {
        console.error('Error fetching all payments:', error);
      }
    },

    async createPayment(paymentData) {
      try {
        const response = await fetchApi('/payment/create', {
          method: 'POST',
          body: JSON.stringify(paymentData),
          headers: {
            'Content-Type': 'application/json-patch+json',
          },
        });
        if (response.ok) {
          console.log('Payment created successfully');
          const newPayment = await response.json();
          this.payments.push(newPayment);
        }
      } catch (error) {
        console.error('Error creating payment:', error);
      }
    },
  },
});
