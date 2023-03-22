import os
import openai
from flask import Flask, jsonify, redirect, render_template, request, url_for

app = Flask(__name__)
### openai.api_key = os.getenv("OPENAI_API_KEY")

openai.api_key = "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"

'''
@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        article = request.form["article"]
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_summary(article),
            temperature=0.5
        )
        return redirect(url_for("index", result=response.choices[0].text))

    result = request.args.get("result")
    return render_template("index.html", result=result)
'''

def gpt3_request(prompt, max_tokens=500):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=max_tokens,
        temperature=0.5,
    )
    return response.choices[0].text.strip()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/summarize", methods=["POST"])
def summarize():
    text = request.json["text"]
    summary = gpt3_request(f"Summarize the following news article:\n\n{text}\n")
    return jsonify(summary=summary)

@app.route("/api/translate", methods=["POST"])
def translate():
    text = request.json["text"]
    translation = gpt3_request(f"Translate the following English text to Simplified Chinese:\n\n{text}\n")
    return jsonify(translation=translation)

'''
def generate_summary(article_text):
    return """Please learn the writing styles of the following template summary, and summarize a news article in a similar way.
    The output should be at roughly the same length as the summary templates provided. 
    The output should contain similar types of information as the summary templates do. 
    The output should contain a title.
    Output: (Title) Cast AI raises $20m in funding 
    (Body): Cast AI, a Miami, FL-based cloud-native automation and cost management startup, raised $20M in funding. The round was led by Creandum. 
    The company intends to use the funds to expand operations and its business reach. Led by CEO Yuri Frayman, Cast AI is an all-in-one 
    cloud-native automation platform that cuts cloud bills in half for AWS, GCP, and Azure customers. The platform employs AI and automation 
    to analyze compute resources and optimize them in minutes. By connecting their Kubernetes clusters to the platform, organizations can 
    see suggested recommendations and use cloud-native automation techniques for immediate cost reduction. Since the platform launch, 
    CAST AI has experienced quarter-by-quarter revenue growth of over 220%, based on the company’s ability to provide optimization solutions 
    that simplify cloud-native application management, a much-needed service in today’s tech-driven world. 
    Article: {}
    Output:""".format(
        article_text
    )


def translate(summary):
    return """Please translate into simplified Chinese""".format(
        summary
    )
'''

if __name__ == "__main__":
    app.run(debug=True)
