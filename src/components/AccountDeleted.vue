
  <template>
    <div class="background">
      <div class="card"> 
        <div class="message">Your account has been successfully deleted. We're sorry to see you go. If you have any feedback or concerns, please contact our support team.</div>
        <button class="done-button" @click="done">Done</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      done() {
        // Add your done action here, for example, navigate to another page or close the card
        this.$router.push('/');
      }
    }
  }
  </script>
  
  <style scoped>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
  }
  
  .card {
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 500px;
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  
  
  .message {
    font-size: 16px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .done-button {
    background: #28a745;
    color: #fff;
    border: none;
    padding: 10px 25px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease;
  }
  
  .done-button:hover {
    background: #218838;
  }
  </style>