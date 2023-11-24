import os
import replicate
import requests
from flask import Flask, request, render_template, send_from_directory, jsonify
from flask_cors import CORS

app = Flask(__name__, static_url_path='/static')
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5000"}})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run_code', methods=['POST'])
def run_code():
    print('THE ENDPOINT WAS TRIGGERED')

    os.environ["REPLICATE_API_TOKEN"] = "r8_CjF8agkgGc6HMKpnQ7SofayRTAY4DJZ2n6f4I"

    data = request.json
    emotion = data.get('user_value_1', None)
    feeling = data.get('user_value_2', None)
    lighting = data.get('user_value_3', None)
    phrase = data.get('user_value_4', None)
    atmosphere = data.get('user_value_5', None)

    print("DATA", {
      'emotion': emotion,
      'feeling': feeling,
      'lighting': lighting,
      'phrase': phrase,
      'atmosphere': atmosphere,
    })

    prompt = ("Abstract digital graphics. Modern clean digital colours. Modern digital style. Minimalistic style. Smooth gradient. Mesh gradient. Without concrete elements. Abstraction and gradients. ")

    if atmosphere == "1":
      prompt = prompt + "Use only warm colors, soft shapes prevail, no corners, stable composition. General atmosphere of the image should be Joyful. "

    elif atmosphere == "2":
      prompt = prompt + "Use only pastel colours, symmetrical or central composition, almost no movement. General atmosphere of the image should be Calm. "

    elif atmosphere == "3":
      prompt = prompt + "Use cool shades, minimalistic and clean style. General atmosphere of the image should be Melancholic. "

    elif atmosphere == "4":
      prompt = prompt + "Use contrasting bright shades, chaotic composition, sharp lines and angles. General atmosphere of the image should be Unexpected. "

    elif atmosphere == "5":
      a = "Use only dark shades, chaotic composition, shapes without corners with a stroke without filling. General atmosphere of the image should be Mystical. "

    elif atmosphere == "6":
      prompt = prompt + "Use only dark shades, a lot of black, asymmetrical composition, clear lines, angles. General atmosphere of the image should be scary. "
          
    if lighting == "1":
      prompt = prompt + "Light natural colours and smooth gradients. "

    elif lighting == "2":
      prompt = prompt + "Dark colours, some parts of the image fade into blackness. "

    elif lighting == "3":
      prompt = prompt + "Contrasts between light and shadow and contrasting colors. "

    elif lighting == "4":
      prompt = prompt + "Bright neon gradients colors. "

    if phrase == "1":
      prompt = prompt + "Circle and centre composition. You have to create feeling of wholeness. "

    elif phrase == "2":
      prompt = prompt + "Squares and rectangles. You have to create feeling of Stability and order. "

    elif phrase == "3":
      prompt = prompt + "Waves and smooth curves. You have to create feeling of Harmony of mind. "

    elif phrase == "4":
      prompt = prompt + "Wtraight lines, absolute symmetry, stable composition. You have to create feeling of Focus. "

    elif phrase == "5":
      prompt = prompt + "Parts of arrows or triangles. Composition should be moving. You have to create feeling of Danger. "

    elif phrase == "6":
      prompt = prompt + "Monochromatic colour palette, do not use concrete shapes, image should have a lot of air. You have to create feeling of Freedom. "

    if emotion == "1":
      prompt = prompt + "Steady, harmonious composition. You have to convey emotion of happiness. "

    elif emotion == "2":
      prompt = prompt + "Cool neutral monocromatic soft and muted colours palette. Slow movement. Convey emotion of sadness. "

    elif emotion == "3":
      prompt = prompt + "Chaotic kinetic composition with many different incompatible figures. Spiral composition. Convey emotion of uncertainty. "

    elif emotion == "4":
      prompt = prompt + "Use high contrast colors and sharp shapes. One sharp contrasting transition in color. Direction of movement and shapes is required. Convey emotion of intrigue. "

    elif emotion == "5":
      prompt = prompt + "Smooth round shapes. Warm soft colors. Airiness. Roundness. Convey emotion of love."

    elif emotion == "6":
      prompt = prompt + "Only dark colors, sharp angular transitions, fast movement, unexpected complete changes in color and shape. You have to convey emotion of ecstasy. "

    if feeling == "1":
      prompt = prompt + "Image should be pleasant. "

    elif feeling == "2":
      prompt = prompt + "Texture of soft fabric. Image should be comfortable. "

    elif feeling == "3":
      prompt = prompt + "Texture of shiny material. "

    elif feeling == "4":
      prompt = prompt + "Strong graininess. Noise effect. Image should be a confusing. "

    elif feeling == "5":
      prompt = prompt + "Metal textures. Concrete textures. Image should be a liitle bit scary. "

    elif feeling == "6":
      prompt = prompt + "Clean image. "

    print('PROMPT', prompt)

    try:
        output = replicate.run(
            "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
            input={"prompt": prompt}
        )

        image_path = '/Users/stepa/Desktop/DreamCanvas/static/materials/generated/generated_image.png'

        if output and isinstance(output, list) and output[0]:
            image_url = output[0]
            image_data = requests.get(image_url).content

            with open(image_path, "wb") as image_file:
                image_file.write(image_data)

            app.logger.error(f"Your image successfully saved there: {image_path}")

        else:
            app.logger.error("Something went wrong")

    except replicate.exceptions.ReplicateError as e:
        app.logger.error(f"ReplicateError: {e}")
    except Exception as e:
        app.logger.error(f"Error: {e}")


    return render_template('index.html')

    @app.route('/static/materials/generated/<generated_image>')
    def get_generated_image(generated_image):
        return send_from_directory('static/materials/generated', generated_image)


if __name__ == '__main__':
    app.run(debug=True)