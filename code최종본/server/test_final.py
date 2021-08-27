from tensorflow.keras.models import load_model
def set_model2(weight, classes):
    model = load_model('./model/'+weight)
    return model

import cv2
import os
import time
from utility import *
def post_process2(frame, outs, conf_threshold, nms_threshold):
    frame_height = frame.shape[0]
    frame_width = frame.shape[1]
    confidences = []
    boxes = []
    final_boxes = []
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > conf_threshold:
                center_x = int(detection[0] * frame_width)
                center_y = int(detection[1] * frame_height)
                
                width = int(detection[2] * frame_width * 1.5)
                height = int(detection[3] * frame_height * 1.5)
                left = int(center_x - width / 2)
                
                top = int(center_y - height / 2)
                confidences.append(float(confidence))
                boxes.append([left, top, width, height])       
    indices = cv2.dnn.NMSBoxes(boxes, confidences, conf_threshold,
                               nms_threshold)

    for i in indices:
        i = i[0]
        box = boxes[i]
        left = box[0]
        top = box[1]
        width = box[2]
        height = box[3]
        if left <= 1 :
            left = 1
        if top <= 1 :
            top = 1
        if left + width >= frame_width :
            width = frame_width-left-1
        if top + height >= frame_height :
            height = frame_height-top-1
        final_boxes.append(box)
        left, top, right, bottom = refined_box(left, top, width, height)
    return final_boxes

CONF_THRESHOLD = 0.8
NMS_THRESHOLD = 0.4
IMG_WIDTH = 416
IMG_HEIGHT = 416

# Give the configuration and weight files for the model and load the network
# using them.
CUR_DIR = os.path.abspath('.')
weights_path = os.path.join(CUR_DIR, './model/yolov3-wider_16000.weights')
config_path =  os.path.join(CUR_DIR, './model/yolov3-face.cfg')
net = cv2.dnn.readNetFromDarknet(config_path, weights_path)
net.setPreferableBackend(cv2.dnn.DNN_BACKEND_OPENCV)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CPU)

import numpy as np
from PIL import Image

def face_detection(image):
    # Create a 4D blob from a frame.
    try:
        crop_list=[]
        
        img = Image.open(image)
        frame = np.asarray(img)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGRA2RGB)
        blob = cv2.dnn.blobFromImage(frame, 1 / 255, (IMG_WIDTH, IMG_HEIGHT),
                                        [0, 0, 0], 1, crop=False)
        # Sets the input to the network
        net.setInput(blob)
        # Runs the forward pass to get output of the output layers
        outs = net.forward(get_outputs_names(net))

        # Remove the bounding boxes with low confidence
        faces = post_process2(frame, outs, CONF_THRESHOLD, NMS_THRESHOLD)
        #print(faces)

        print(len(faces),",detected,")
        #print('#' * 60)

        for i in range(len(faces)):
            left = faces[i][0]
            top = faces[i][1]
            width = faces[i][2]
            height = faces[i][3]
            right = left + width
            bottom = top + height
            crop = frame[top:bottom,left:right]
            crop_list.append(crop)
    except Exception as e:
        print(e)
        print('0,detected,')
    return crop_list

ACCURACY_THRESHOLD = 0.6
import numpy as np
from PIL import Image
def test(model, face):
    targetx = 224
    targety = 224
    #train_dir = os.getcwd()+"/label/"
    f = open(r'./label/label.txt',encoding='utf8')
    lines = f.readlines()
    class_list = []
    for line in lines:
        class_list.append(line.strip())
    class_list.sort();

    res = cv2.resize(face, dsize=(224, 224))
    res_image = res.astype("float") / 256
    X = res_image.reshape(-1, targetx, targety,3)
    categories = class_list
    pred = model.predict(X)
    #print(pred[0])
    result = [np.argmax(value) for value in pred]   # 예측 값중 가장 높은 클래스 반환
    #print('New image prediction : ',categories[result[0]])
    #print("accuracy : {}".format(max(pred[0])))
    #plt.imshow(image)
    #plt.show()
    return categories[result[0]], max(pred[0])

from PIL import Image
def test_imagelist(model, class_num, image):
    model = set_model2(model, class_num)
    #image_list = list(args)
    #image_crop_list = []
    #for image in image_list :
        #image_crop_list.append(face_detection(image)) 
    image_crop_list = face_detection(image)
    f = open(r'./label/label.txt',encoding='utf8')
    lines = f.readlines()
    class_list = []
    for line in lines:
        class_list.append(line.strip())
    class_list.sort();
    b = []
    c = []
    d = []
    for i in range(len(class_list)):
        b.append([])
        c.append([])
    acc_dict = dict(zip(class_list, b))
    img_dict = dict(zip(class_list, c))
    result_img_dict = dict(zip(class_list, d))
    #for i in image_crop_list :
     #   for j in i:
      #      if j.shape[0] == 0 or j.shape[1] == 0 :
       #         continue
        #    person, accuracy = test(model, j)
         #   acc_dict[person].append(accuracy)
          #  img_dict[person].append(j)
    for i in image_crop_list:
        if i.shape[0] ==0 or i.shape[1] ==0 :
            continue
        person,accuracy = test(model, i)
        acc_dict[person].append(accuracy)
        img_dict[person].append(i)
    #print(acc_dict)
    print("여기부터 예측값:::")
    return_list = []
    num=1
    for key, value in acc_dict.items():
        if value:
            if max(value) >= ACCURACY_THRESHOLD:
                print(key)
                print("{0:.1%}".format(max(value)))
                max_accuracy_img = img_dict[key][value.index(max(value))]
                #max_accuracy_img_jpg = Image.fromarray(max_accuracy_img)
                #return_list.append([key, max(value), max_accuracy_img_jpg])
                cv2.imwrite('./tmp_image/'+str(num)+".jpg",max_accuracy_img )
                #plt.imshow(max_accuracy_img)
                #plt.show()
                num+=1
import sys
#import ast
#def arg_as_list(s):
 #   v = ast.literal_eval(s)
  #  if type(v) is not list :
   #     raise argparse.ArgumentTypeError("Argument \"%s\" is not a list" % (s))
    #return v
#from argparse import ArgumentParser
#def get_args():
    #parser = ArgumentParser()
    #parser.add_argument('--model', type=str)
    #parser.add_argument('--class_num', type=int)
    #parser.add_argument('--image', type=str)
    #args, _ = parser.parse_known_args()
    #return args
    #test_imagelist(str(args.model), args.class_num, args.image_list

    
if __name__ == "__main__":
    test_imagelist(sys.argv[1], int(sys.argv[2]), sys.argv[3])
