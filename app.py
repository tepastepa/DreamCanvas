import os
import replicate
import requests
from flask import Flask, request, render_template

os.environ["REPLICATE_API_TOKEN"] = "r8_7uwQKVX5Jw9CLjXJYy047rlPcMeqQK009k1y1"

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])

def index():
    if request.method == 'POST':
        atmosphere = request.form.get('atmosphere')
        
    
    if __name__ == '__main__':
        app.run(debug=True)

        if atmosphere == "1":
          a = "Use only warm colors, soft shapes prevail, no corners, stable composition. General atmosphere of the image should be Joyful. "

        elif atmosphere == "2":
          a = "Use only pastel colours, symmetrical or central composition, almost no movement. General atmosphere of the image should be Calm. "

        elif atmosphere == "3":
          a = "Use cool shades, minimalistic and clean style. General atmosphere of the image should be Melancholic. "

        elif atmosphere == "4":
          a = "Use contrasting bright shades, chaotic composition, sharp lines and angles. General atmosphere of the image should be Unexpected. "

        elif atmosphere == "5":
          a = "Use only dark shades, chaotic composition, shapes without corners with a stroke without filling. General atmosphere of the image should be Mystical. "

        elif atmosphere == "6":
          a = "Use only dark shades, a lot of black, asymmetrical composition, clear lines, angles. General atmosphere of the image should be scary. "

        else: 
          print("Error")
          
    return render_template('your_template.html')



def index():
    if request.method == 'POST':
        lightning = request.form.get('lightning')
        
    
        if __name__ == '__main__':
            app.run(debug=True)

        if lightning == "1":
          b = "Light natural colours and smooth gradients. "

        elif lightning == "2":
          b = "Dark colours, some parts of the image fade into blackness. "

        elif lightning == "3":
          b = "Contrasts between light and shadow and contrasting colors. "

        elif lightning == "4":
          b = "Bright neon gradients colors. "

        else: 
          print("Error")

    return render_template('your_template.html')


def index():
    if request.method == 'POST':
        phrase = request.form.get('phrase')
        
    
        if __name__ == '__main__':
            app.run(debug=True)

        if phrase == "1":
          c = "Circle and centre composition. You have to create feeling of wholeness. "

        elif phrase == "2":
          c = "Squares and rectangles. You have to create feeling of Stability and order. "

        elif phrase == "3":
          c = "Waves and smooth curves. You have to create feeling of Harmony of mind. "

        elif phrase == "4":
          c = "Wtraight lines, absolute symmetry, stable composition. You have to create feeling of Focus. "

        elif phrase == "5":
          c = "Parts of arrows or triangles. Composition should be moving. You have to create feeling of Danger. "

        elif phrase == "6":
          c = "Monochromatic colour palette, do not use concrete shapes, image should have a lot of air. You have to create feeling of Freedom. "

        else: 
          print("Error")
    return render_template('your_template.html')


def index():
    if request.method == 'POST':
        emotion = request.form.get('emotion')
        
    
        if __name__ == '__main__':
            app.run(debug=True)

        if emotion == "1":
          d = "Steady, harmonious composition. You have to convey emotion of happiness. "

        elif emotion == "2":
          d = "Cool neutral monocromatic soft and muted colours palette. Slow movement. Convey emotion of sadness. "

        elif emotion == "3":
          d = "Chaotic kinetic composition with many different incompatible figures. Spiral composition. Convey emotion of uncertainty. "

        elif emotion == "4":
          d = "Use high contrast colors and sharp shapes. One sharp contrasting transition in color. Direction of movement and shapes is required. Convey emotion of intrigue. "

        elif emotion == "5":
          d = "Smooth round shapes. Warm soft colors. Airiness. Roundness. Convey emotion of love."

        elif emotion == "6":
          d = "Only dark colors, sharp angular transitions, fast movement, unexpected complete changes in color and shape. You have to convey emotion of ecstasy. "

        else: 
          print("Error")

    return render_template('your_template.html')





def index():
    if request.method == 'POST':
        feeling = request.form.get('feeling')
        
    
        if __name__ == '__main__':
            app.run(debug=True)

        if feeling == "1":
          e = "Image should be pleasant. "

        elif feeling == "2":
          e = "Texture of soft fabric. Image should be comfortable. "

        elif feeling == "3":
          e = "Texture of shiny material. "

        elif feeling == "4":
          e = "Strong graininess. Noise effect. Image should be a confusing. "

        elif feeling == "5":
          e = "Metal textures. Concrete textures. Image should be a liitle bit scary. "

        elif feeling == "6":
          e = "Clean image. "

        else: 
          print("Error")
      
    return render_template('your_template.html')









prompt = ("Abstract digital graphics. Modern clean digital colours. Modern digital style. Minimalistic style. Smooth gradient. Mesh gradient. Without concrete elements. Abstraction and gradients. " + b + c + d + e)





for _ in range(10):

    try:
        output = replicate.run(
            "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
            input={"prompt": prompt}
        )

        if output and isinstance(output, list) and output[0]:
            image_url = output[0]
            image_data = requests.get(image_url).content
            folder_path = "/DreamCanvas/materials/generated"
            os.makedirs(folder_path, exist_ok=True)

            existing_files = [f for f in os.listdir(folder_path) if f.startswith("Image_")]
            next_filename = f"Image_{str(len(existing_files) + 1).zfill(3)}.png"

            image_path = os.path.join(folder_path, next_filename)
            with open(image_path, "wb") as image_file:
                image_file.write(image_data)

            print(f"Your image successfully saved there: {image_path}")
        else:
            print("Something went wrong")

    except replicate.exceptions.ReplicateError as e:
        print(f"ReplicateError: {e}")
    except Exception as e:
        print(f"Error: {e}")

