// Script para funcionalidade interativa
document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const quantityButtons = document.querySelectorAll('.quantity-btn');
    const priceElement = document.querySelector('.price');
    const purchaseButton = document.querySelector('.partial-button');
    const productItems = document.querySelectorAll('.product-item input[type="radio"]');
    const purchaseOptions = document.querySelectorAll('.purchase-option');
    const partialContent = document.querySelector('.partial-content');
    const completeContent = document.querySelector('.complete-content');
    
    // Preços base
    const basePrice = 149.99;
    
    // Função para atualizar preço e texto do botão
function updatePriceDisplay(quantity) {
    const totalPrice = (basePrice * quantity).toFixed(2);
    priceElement.textContent = totalPrice.replace('.', ',') + ' €';
}

// Mapeia produto -> shortcode
const productShortcodes = {
    iphone: `[dynamic_product_info variant_id="42996311523439" image_url="https://cdn.shopify.com/s/files/1/0637/7947/1471/files/2caja.png?v=1747170460" price="69.00" name="2 Cajas" button_text="PAGAR CONTRA REEMBOLSO"]`,
    samsung: `[dynamic_product_info variant_id="42996311523440" price="79.00" name="Dior" button_text="PAGAR CONTRA REEMBOLSO"]`,
    ipad: `[dynamic_product_info variant_id="42996311523441" price="89.00" name="Carolina Herrera" button_text="PAGAR CONTRA REEMBOLSO"]`,
    airpods: `[dynamic_product_info variant_id="42996311523442" price="99.00" name="Paco Rabanne" button_text="PAGAR CONTRA REEMBOLSO"]`
};

// Função para atualizar botão de checkout com shortcode
function updateCheckoutButton(productValue) {
    const container = document.getElementById('checkout-button-container');
    container.innerHTML = productShortcodes[productValue] || '';
}



    
    // Event listeners para botões de quantidade
    quantityButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            quantityButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Atualizar preço e texto do botão
            const quantity = parseInt(this.dataset.quantity);
            updatePriceDisplay(quantity);
        });
    });
    
    // Event listeners para opções de produto
   productItems.forEach(item => {
    item.addEventListener('change', function () {
        updateCheckoutButton(this.value);
    });

    // Se estiver marcado no carregamento (ex: checked por padrão)
    if (item.checked) {
        updateCheckoutButton(item.value);
    }
});

    
    // Event listeners para tipos de compra
    purchaseOptions.forEach((option, index) => {
        option.addEventListener('click', function() {
            // Remover classe ativa de todas as opções
            purchaseOptions.forEach(opt => opt.classList.remove('active'));
            
            // Adicionar classe ativa à opção clicada
            this.classList.add('active');
            
            // Alternar entre conteúdos
            if (index === 0) { // Compra parcial
                partialContent.classList.add('active');
                completeContent.classList.remove('active');
            } else { // Lote completo
                partialContent.classList.remove('active');
                completeContent.classList.add('active');
            }
        });
    });
    
    // Event listener para botões de compra
    document.querySelectorAll('.purchase-button').forEach(button => {
        button.addEventListener('click', function() {
            alert('Compra processada com sucesso!');
        });
    });
});
