document.getElementById('cipherSelect').addEventListener('change', function() {
    const selectedCipher = document.getElementById('cipherSelect').value;
    const cipherDivs = document.querySelectorAll('.cipherDiv');
    cipherDivs.forEach(div => div.style.display = 'none');
    
    document.getElementById(selectedCipher).style.display = 'block';
  });
  
  function caesarCipher(str, shift) {
    return str.replace(/[a-zA-Z]/g, function(c) {
      const base = c < 'a' ? 65 : 97;
      return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
    });
  }
  
  function translate() {
    const plaintextValue = document.getElementById('plaintext').value;
    const shiftValue = parseInt(document.getElementById('shift').value);
    const outputValue = caesarCipher(plaintextValue, shiftValue);
    document.getElementById('output').innerHTML = outputValue;
  }
  
  document.getElementById('plaintext').addEventListener('input', translate);
  document.getElementById('shift').addEventListener('input', translate);
  
  // reset button
  document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('shift').value = 1;
    document.getElementById('plaintext').value = '';
    document.getElementById('output').innerHTML = '';
  });
  
  // Function to decrypt Caesar Cipher
  function caesarDecipher(str, shift) {
    return caesarCipher(str, 26 - (shift % 26));
  }
  
  // Add event listener for decryption
  document.getElementById('decryptButton').addEventListener('click', function() {
    const plaintextValue = document.getElementById('plaintext').value;
    const shiftValue = parseInt(document.getElementById('shift').value);
    const outputValue = caesarDecipher(plaintextValue, shiftValue);
    document.getElementById('output').innerHTML = outputValue;
  });
  
  // ROT13 Cipher
  function rot13(str) {
    return str.replace(/[a-zA-Z]/g, function(c) {
      const base = c < 'a' ? 65 : 97;
      return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
    });
  }
  
  function translateRot13() {
    const plaintextValue = document.getElementById('plaintext-rot13').value;
    const outputValue = rot13(plaintextValue);
    document.getElementById('output-rot13').innerHTML = outputValue;
  }
  
  document.getElementById('plaintext-rot13').addEventListener('input', translateRot13);
  document.getElementById('resetButtonRot13').addEventListener('click', function() {
    document.getElementById('plaintext-rot13').value = '';
    document.getElementById('output-rot13').innerHTML = '';
  });
  
  // Vigenère Cipher
  function vigenereCipher(text, key) {
    let translated = '';
    key = key.toUpperCase();
  
    for (let i = 0, j = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      if (c >= 65 && c <= 90) {
        translated += String.fromCharCode((c - 65 + key.charCodeAt(j % key.length) - 65) % 26 + 65);
        j++;
      } else if (c >= 97 && c <= 122) {
        translated += String.fromCharCode((c - 97 + key.charCodeAt(j % key.length) - 65) % 26 + 97);
        j++;
      } else {
        translated += text.charAt(i);
      }
    }
    return translated;
  }
  
  function translateVigenere() {
    const plaintextValue = document.getElementById('plaintext-vigenere').value;
    const keyValue = document.getElementById('key').value;
    const outputValue = vigenereCipher(plaintextValue, keyValue);
    document.getElementById('output-vigenere').innerHTML = outputValue;
  }
  
  document.getElementById('plaintext-vigenere').addEventListener('input', translateVigenere);
  
  document.getElementById('resetButtonVigenere').addEventListener('click', function() {
    document.getElementById('key').value = '';
    document.getElementById('plaintext-vigenere').value = '';
    document.getElementById('output-vigenere').innerHTML = '';
  });
  
  // Affine Cipher
  function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
    return -1;
  }
  
  function affineCipher(str, a, b) {
    const m = 26;
    return str.replace(/[a-zA-Z]/g, function(c) {
      const base = c < 'a' ? 65 : 97;
      return String.fromCharCode((a * (c.charCodeAt(0) - base) + b) % m + base);
    });
  }
  
  function translateAffine() {
    const plaintextValue = document.getElementById('plaintext-affine').value;
    const aValue = parseInt(document.getElementById('a').value);
    const bValue = parseInt(document.getElementById('b').value);
    const outputValue = affineCipher(plaintextValue, aValue, bValue);
    document.getElementById('output-affine').innerHTML = outputValue;
  }
  
  document.getElementById('plaintext-affine').addEventListener('input', translateAffine);
  document.getElementById('a').addEventListener('input', translateAffine);
  document.getElementById('b').addEventListener('input', translateAffine);
  
  document.getElementById('resetButtonAffine').addEventListener('click', function() {
    document.getElementById('a').value = 1;
    document.getElementById('b').value = 0;
    document.getElementById('plaintext-affine').value = '';
    document.getElementById('output-affine').innerHTML = '';
  });
  
  function affineDecipher(str, a, b) {
    const m = 26;
    const aInv = modInverse(a, m);
    if (aInv === -1) {
      return "Modular inverse doesn't exist.";
    }
    return str.replace(/[a-zA-Z]/g, function(c) {
      const base = c < 'a' ? 65 : 97;
      return String.fromCharCode((aInv * (c.charCodeAt(0) - base - b + m) % m + m) % m + base);
    });
  }
  
  document.getElementById('decryptButtonAffine').addEventListener('click', function() {
    const plaintextValue = document.getElementById('plaintext-affine').value;
    const aValue = parseInt(document.getElementById('a').value);
    const bValue = parseInt(document.getElementById('b').value);
    const outputValue = affineDecipher(plaintextValue, aValue, bValue);
    document.getElementById('output-affine').innerHTML = outputValue;
  });
  
  // Substitution Cipher
  function substitutionCipher(str, alphabet) {
    const baseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const substitutionMap = {};
  
    for (let i = 0; i < baseAlphabet.length; i++) {
      substitutionMap[baseAlphabet[i]] = alphabet[i];
      substitutionMap[baseAlphabet[i].toLowerCase()] = alphabet[i].toLowerCase();
    }
  
    return str.replace(/[a-zA-Z]/g, function(c) {
      return substitutionMap[c];
    });
  }
  
  function translateSubstitution() {
    const plaintextValue = document.getElementById('plaintext-substitution').value;
    const alphabetValue = document.getElementById('substitution-alphabet').value.toUpperCase();
  
    
    const outputValue = substitutionCipher(plaintextValue, alphabetValue);
    document.getElementById('output-substitution').innerHTML = outputValue;
  }
  
  document.getElementById('plaintext-substitution').addEventListener('input', translateSubstitution);
  document.getElementById('substitution-alphabet').addEventListener('input', translateSubstitution);
  
  document.getElementById('resetButtonSubstitution').addEventListener('click', function() {
    document.getElementById('substitution-alphabet').value = '';
    document.getElementById('plaintext-substitution').value = '';
    document.getElementById('output-substitution').innerHTML = '';
  });
  
  // BLOCK CIPHERS
  async function encryptData(data, key) {
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const encodedData = new TextEncoder().encode(data);
    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      key,
      { name: 'AES-CBC' },
      false,
      ['encrypt']
    );
    const encryptedData = await window.crypto.subtle.encrypt(
      { name: 'AES-CBC', iv: iv },
      cryptoKey,
      encodedData
    );
    return { iv, encryptedData: new Uint8Array(encryptedData) };
  }
  
  async function decryptData(encryptedData, key, iv) {
    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      key,
      { name: 'AES-CBC' },
      false,
      ['decrypt']
    );
    const decryptedData = await window.crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: iv },
      cryptoKey,
      encryptedData
    );
    const decodedData = new TextDecoder().decode(decryptedData);
    return decodedData;
  }
  
  // Advanced Encryption Standard (AES)
  document.getElementById('aes-encrypt').addEventListener('click', async () => {
    const key = document.getElementById('aes-key').value;
    const plaintext = document.getElementById('aes-plaintext').value;
    if (key.length !== 32) {
      alert('Key must be 32 characters long.');
      return;
    }
    const keyBytes = new TextEncoder().encode(key);
    const result = await encryptData(plaintext, keyBytes);
    document.getElementById('aes-output').textContent = `IV: ${Array.from(result.iv).join(',')} Encrypted: ${Array.from(result.encryptedData).join(',')}`;
  });
  
  document.getElementById('aes-decrypt').addEventListener('click', async () => {
    const key = document.getElementById('aes-key').value;
    const ivAndEncryptedData = document.getElementById('aes-output').textContent.split(' Encrypted: ');
    const iv = new Uint8Array(ivAndEncryptedData[0].slice(4).split(',').map(Number));
    const encryptedData = new Uint8Array(ivAndEncryptedData[1].split(',').map(Number));
    const keyBytes = new TextEncoder().encode(key);
    const decryptedText = await decryptData(encryptedData, keyBytes, iv);
    document.getElementById('aes-output').textContent = `Decrypted: ${decryptedText}`;
  });
  
  document.getElementById('resetButtonAES').addEventListener('click', function() {
    document.getElementById('aes-key').value = '';
    document.getElementById('aes-plaintext').value = '';
    document.getElementById('aes-output').innerHTML = '';
  });
  
  // Triple 3DES
  $(document).ready(function() {
    $('#Tdes-encrypt').click(function() {
      const message = $('#3des-plaintext').val();
      const key = $('#3des-key').val();
      const encrypted = CryptoJS.TripleDES.encrypt(message, key).toString();
      $('#3des-output').text('Encrypted: ' + encrypted);
    });
  
    $('#Tdes-decrypt').click(function() {
      const encrypted = $('#3des-output').text().replace('Encrypted: ', '');
      const key = $('#3des-key').val();
      const decrypted = CryptoJS.TripleDES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
      $('#3des-output').text('Decrypted: ' + decrypted);
    });
  });
  
  document.getElementById('resetButtonTriple').addEventListener('click', function() {
    document.getElementById('3des-key').value = '';
    document.getElementById('3des-plaintext').value = '';
    document.getElementById('3des-output').innerHTML = '';
  });
  
  // ciphertext machine info popups
  $(document).ready(function() {
      // Toggle information section on image click
      $('.info-img').click(function() {
        $('#info-DES').slideToggle();
        $('#info-CC').slideToggle();
        $('#info-ROT').slideToggle();
        $('#info-VC').slideToggle();
        $('#info-AC').slideToggle();
        $('#info-SC').slideToggle();
        $('#info-AES').slideToggle();
      });
  
      // Tooltip functionality
      $('[data-tooltip]').hover(function() {
        const tooltipText = $(this).attr('data-tooltip');
        const tooltip = $('<div class="tooltip"></div>').text(tooltipText);
        $('body').append(tooltip);
        tooltip.css({
          left: event.pageX + 10 + 'px',
          top: event.pageY + 10 + 'px'
        });
        tooltip.fadeIn();
      }, function() {
        $('.tooltip').remove();
      }).mousemove(function() {
        $('.tooltip').css({
          left: event.pageX + 10 + 'px',
          top: event.pageY + 10 + 'px'
        });
      });
    });