import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash

app = Flask(__name__)
DB_FILE = 'pessoas.json'
CORS(app)

def carregar_pessoas():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def salvar_pessoas(pessoas):
    with open(DB_FILE, 'w', encoding='utf-8') as f:
        json.dump(pessoas, f, ensure_ascii=False, indent=2)

@app.route('/registrar', methods=['POST'])
def registrar_pessoa():
    pessoas = carregar_pessoas()
    dados = request.json
    nome = dados.get('nome')
    tipo = dados.get('tipo')
    especialidade = dados.get('especialidade') if tipo == 'medico' else None
    senha = dados.get('senha')
    
    if tipo not in ['medico', 'cliente']:
        return jsonify({'erro': 'Tipo inválido'}), 400

    
    if not senha:
        return jsonify({'erro': 'Senha obrigatória'}), 400
    senha_hash = generate_password_hash(senha)
    pessoa = {
        'nome': nome,
        'tipo': tipo,
        'especialidade': especialidade,
        'senha_hash': senha_hash
    }
    pessoas.append(pessoa)
    salvar_pessoas(pessoas)
    return jsonify({'mensagem': 'Pessoa registrada com sucesso!', 'pessoa': pessoa}), 201

@app.route('/pessoas', methods=['GET'])
def listar_pessoas():
    pessoas = carregar_pessoas()
    return jsonify(pessoas)

if __name__ == '__main__':
    app.run(debug=True)