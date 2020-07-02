import os
import datetime
from flask import Flask, session, url_for, redirect, render_template, request, jsonify
import json


global_data = [{"year":2019}]



app = Flask(__name__)

@app.route('/alexa_post', methods=['POST'])
def alexa_post():
    if request.method == 'POST':
        data = request.get_json()
        global_data.append(data)
        print (data)
        print (global_data)
        return jsonify(data)
@app.route('/alexa_get', methods=['GET'])
def alexa_get():
    if request.method == 'GET':
        return jsonify(global_data[-1])


@app.route("/", methods=("POST", "GET"))
def home():
    year = 2019
    with open('data/graph3_new.json') as json_file:
        data = json.load(json_file)
    with open('data/men_women.json') as json_file:
        m_w_data = json.load(json_file)
    return render_template("index.html",data=data,year=year,m_w_data=m_w_data)

@app.route('/first_plot', methods=("POST", "GET"))
def first_plot():
    with open('data/formatted_data_new.json') as json_file:
        data = json.load(json_file)
    return render_template('first_plot.html',data=data)

@app.route('/country', methods=("POST", "GET"))
def country():
    return render_template('index_2.html')

@app.route('/d_first_plot', methods=("POST", "GET"))
def d_first_plot():
    return render_template('denise/index.html')

@app.route('/d_second_plot', methods=("POST", "GET"))
def d_second_plot():
    return render_template('denise/India.html')

@app.route('/d_third_plot', methods=("POST", "GET"))
def d_third_plot():
    return render_template('denise/plot3.html')

@app.route('/d_fourth_plot', methods=("POST", "GET"))
def d_fourth_plot():
    return render_template('denise/Asia.html')

@app.route('/globe', methods=("POST", "GET"))
def globe():
    with open('data/formatted_data_new.json') as json_file:
        actual_data = json.load(json_file)
    with open('data/world-countries.json') as json_file:
        world = json.load(json_file)
    return render_template('globe.html',actual_data=actual_data,world=world)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
