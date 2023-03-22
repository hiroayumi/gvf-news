import os
import openai
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
### openai.api_key = os.getenv("OPENAI_API_KEY")

openai.api_key = "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"

@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        article = request.form["article"]
        response = openai.Completion.create(
            model="text-davinci-003",
            summary=generate_summary(article),
            temperature=0.6,
        )
        return redirect(url_for("index", result=response.choices[0].text))

    result = request.args.get("result")
    return render_template("index.html", result=result)


'''
def generate_summary(article):
    return """Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: {}
Names:""".format(
        summary.capitalized()
    )
'''

def generate_summary(article):
    prompt = "Please learn the writing styles of the following template summaries, and summarize a news article in a similar way." 
    + "Requirement: 1) The summary should be at roughly the same length as the summary templates provided "
    + "2) The summary should contain similar types of information as the summary templates do 3) The summary should contain a title"
    + "Template summary 1: (Title) Rippling raises $500m following collapse of banking partner SVB" 
    + "(Body) Company payroll and spend management fintech Rippling has raised $500 million in a Series E financing round. "
    + "Following FDIC takeover of SVB on 10 March, Rippling extended $130 million of its own capital to fund customer payments to their employees."
    + "The firm leveraged its backup payments infrastructure with JP Morgan Chase to ensure most customers’ employees received their pay that same day,"
    + "with the remainder receiving their pay Monday morning. Nonetheless, Rippling CEO Parker Conrad says “$545 million of our customers’ "
    + "money was still locked up at SVB”. “We had a number of sources of capital but raising a funding round was our best option,”"
    + "he adds. Turning to long-time investor Greenoaks, Rippling was able to raise $500 million by the following Monday morning. "
    + "Despite the FDIC confirming all SVB deposits would be guaranteed, Rippling decided to go forward with the financing round. "
    + "The Series E values the firm at $11.25 billion, the same as the Series D in May last year. “Now, we’ve recovered all funds from SVB "
    +"and our balance sheet holds just shy of $1 billion in cash,” Conrad adds."
    + "Template summary 1: (Title) Cast AI raises $20m in funding (Body): Cast AI, a Miami, FL-based cloud-native automation "
    + "and cost management startup, raised $20M in funding. The round was led by Creandum. The company intends to use the funds "
    + "to expand operations and its business reach. Led by CEO Yuri Frayman, Cast AI is an all-in-one cloud-native automation platform "
    + "that cuts cloud bills in half for AWS, GCP, and Azure customers. The platform employs AI and automation to analyze compute resources "
    + "and optimize them in minutes. By connecting their Kubernetes clusters to the platform, organizations can see suggested recommendations "
    + "and use cloud-native automation techniques for immediate cost reduction. Since the platform launch, CAST AI has experienced quarter-by-quarter "
    + "revenue growth of over 220%, based on the company’s ability to provide optimization solutions that simplify cloud-native application "
    + "management, a much-needed service in today’s tech-driven world. Article to summarize:\n{article}\n"
    summary = chat_gpt_request(prompt)
    return summary

if __name__ == "__main__":
    app.run(debug=True)