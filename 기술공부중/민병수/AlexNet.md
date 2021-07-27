# AlexNet
# ImageNet Classification with Deep Convolutional Neural Networks


AlexNet의 기본구조는 LeNet-5와 크게 다르지 않다. 2개의 GPU로 병렬연산을 수행하기 위해서 병렬적인 구조로 설계되었다는 점이 가장 큰 변화이다. 
![image](https://user-images.githubusercontent.com/77095328/127148098-1b47e84b-e0b3-48ea-bc07-9c9929fd9469.png)

AlexNet이 가장 큰 의의를 지니는 것은,

바로 이 객체 인식 대회에서는 여러 알고리즘과 방법, 기술들이 사용되었고,

이전만 해도 딥러닝은 이론만 장황하고 성능은 형편없는 기술로 여겨졌는데,

당시 가장 대세였고 성능이 좋던 SVM + HoG 모델을 제치고, 딥러닝 기술이 컴퓨터 비전에서 최고 성능을 낼수있다고 증명을 했다는 것이다.

AlexNet이 한 것은 LeNet의 개념을 잘 다듬고, 병렬 처리 및, 활성화 함수를 바꿈으로써, 연산 속도를 빠르게 만든 것이다.

AlexNet은 8개의 레이어로 구성되어 있다. 5개의 컨볼루션 레이어와 3개의 full-connected 레이어로 구성되어 있다. 두번째, 네번째, 다섯번째 컨볼루션 레이어들은 전 단계의 같은 채널의 특성맵들과만 연결되어 있는 반면, 세번째 컨볼루션 레이어는 전 단계의 두 채널의 특성맵들과 모두 연결되어 있다는 것을 짚고 넘어가자. 


이제 각 레이어마다 어떤 작업이 수행되는지 살펴보자. 우선 AlexNet에 입력 되는 것은 227 x 227 x 3 이미지다. (227 x 227 사이즈의 RGB 컬러 이미지를 뜻한다.) 

첫 5개 층은 Convolution, 그 뒤 3개 층은 Fully-Connected 층입니다. 각각의 층들은 하나의 이미지에 대해 독립적으로 특징을 추출하여(Feature Extraction) 가중치를 조정함으로써 필터를 학습시킵니다.

- 1~2층은 Max Pooling 층입니다. 이를 통해 데이터의 중요한 요소들만 요약하여 추출합니다.


- 3~5층은 서로 직접 연결되어 중간다리 역할을 합니다.


- 5층 뒤에는 Max Pooling 층이 뒤따르는데, 이곳의 출력은 Fully Connected 층 두 개로 구성됩니다. 1~5층에서 학습된 데이터들은 Fully Connected 층에서 분류됩니다.


- 최종적으로는 1000 class label이 있는 Softmax 분류기로 분류됩니다.


한편, AlexNet은 특이한 점이 몇 가지 있습니다.


- 첫 번째 층에서 학습된 필터를 시각화 하면 상단에는 주로 Non-Color Feature가, 하단에는 주로 Color Feature가 나타나는데 상단과 하단의 학습 환경이 같음에도 불구하고 이런 결과가 나타난 이유를 알 수 없었습니다.

- 또한 세 번째 층은 예외적으로 이전 단계의 층으로부터 학습된 모든 필터들을 가져오는데, 이러한 알고리즘은 아마 병렬 학습으로 인해 각각의 필터들의 연관성이 크게 벗어나는 것을 방지하기 위한 것으로 보입니다.


![image](https://user-images.githubusercontent.com/77095328/127149480-8ec7016b-f239-4f00-b4f7-8a18ecbd5ea1.png)

1) Overlapping Pooling Layer: 다른 CNN 모델에서 Pooling은 일반적으로 필터를 겹치지 않게 Stride를 적절히 조정하여 사용합니다. 그러나 AlexNet에서는 Stride를 좁혀 Overlapping 하는 구조를 만들었습니다. 이 경우, 정확도는 약 0.4%가 향상되지만 Overlapping의 사용은 연상량을 증가시켰습니다.

![image](https://user-images.githubusercontent.com/77095328/127149553-84b14da9-9743-43c9-a9a4-cf27c314b189.png)
2) ReLU Activation Function 사용: ReLU는 최근까지도 가장 보편적으로 쓰이는 활성화 함수입니다. AlexNet에서도 ReLU를 사용하면 tanh함수에 비해 학습 속도가 최고 6배까지 빠릅니다

![image](https://user-images.githubusercontent.com/77095328/127149571-77880214-dbff-467d-925a-c96fe5f32331.png)
3) Local Response Normalization(LRN) 사용: 이 기법은 AlexNet에서 처음 도입되었습니다. 활성화 함수를 적용하기 전에 Normalization을 적용하여 함수의 결과값에서 더 좋은 일반화 결과를 도출했습니다. LRN은 사용하는 이유는 이미지의 인접화소들을 억제시키고 특징을 부각시키기 위함입니다. 그 결과, 정확도가 1.4% 향상되었습니다. LRN은 신경생물학에서 그 원리를 가져왔습니다. 예컨대, 밝은 빛을 보면 눈이 어두워진다거나, 특정 사물에 집중하면 그 부분만 집중하여 보이게 되는 현상입니다.

![image](https://user-images.githubusercontent.com/77095328/127149630-49382b92-b2df-40d8-bfbe-ec65d671cb71.png)
4) Dropout 사용: 6, 7층(Fully-Connected)에서 50% 확률의 Dropout을 적용했습니다. 이는 신경망 사이의 연결을 랜덤으로 끊음으로서 Overfitting을 줄여줍니다. Dropout이 비록 학습시간을 약 2배 가량 증가시키지만, 이 기법이 없으면 Overfitting이 늘어나 에러 확률이 높아집니다.

5) Training on Multiple GPUs: GPU 여러 개를 사용한 병렬처리 기법으로 학습시간을 획기적으로 줄였습니다.
6) Data Augmentation: 동일한 이미지들을 조금씩 변형시켜가며 학습하면 Overfitting을 방지하는 데 도움이 됩니다. Data Augmentation에는 이미지를 좌우 반전시키는 Mirroring 기법, 이미지의 특정 부분을 무작위로 자르는 Random Crops 기법, RGB채널을 임의로 바꾸는 PCA Color Augmentation 기법 등이 있습니다. AlexNet을 만든 연구원들은 이러한 방법을 사용하여 데이터 양을 2048배로 늘렸습니다.
