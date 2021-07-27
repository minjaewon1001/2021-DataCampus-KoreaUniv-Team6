# CNN의 발전, 모델 정리 1. AlexNet
## 0. 개요
2012   
GPU, ReLU함수 사용하면서, 깊은 네트워크(8Layer) 학습하여 성능 상승(오차율 16.4%)

## 1. 동기
고해상도 이미지에 대규모로 Convolutional Neural Network를 적용하기에는 여전히 많은 연산량 소모   
이와 함께 적은 데이터셋 있으니, 과적합을 막아야 했다.








## 2. 주요 기능

### 2.1 학습 최적화

#### ReLU 활성화 함수

![image](https://user-images.githubusercontent.com/67731178/127152666-264aa79e-9720-4087-b524-f84c65850b1a.png)

ReLU는 최근까지도 가장 보편적으로 쓰이는 활성화 함수입니다. AlexNet에서도 ReLU를 사용하면 tanh함수에 비해 학습 속도가 최고 6배까지 빠릅니다.


#### 2개의 GPU 사용
GPU 여러 개를 사용한 병렬처리 기법으로 학습시간을 획기적으로 줄였습니다.

### 2.2 과적합 방지

#### Data Augmentation
![image](https://user-images.githubusercontent.com/67731178/127152886-0123104c-51cb-41ef-9d70-c78fd56a4427.png)

동일한 이미지들을 조금씩 변형시켜가며 학습하면 Overfitting을 방지하는 데 도움이 됩니다. 
Data Augmentation에는 이미지를 좌우 반전시키는 Mirroring 기법, 이미지의 특정 부분을 무작위로 자르는 Random Crops 기법, RGB채널을 임의로 바꾸는 PCA Color Augmentation 기법 등이 있습니다. 
AlexNet을 만든 연구원들은 이러한 방법을 사용하여 데이터 양을 2048배로 늘렸습니다
#### Dropout
6, 7층(Fully-Connected)에서 50% 확률의 Dropout을 적용했습니다. 이는 신경망 사이의 연결을 랜덤으로 끊음으로서 Overfitting을 줄여줍니다.   
Dropout이 비록 학습시간을 약 2배 가량 증가시키지만, 이 기법이 없으면 Overfitting이 늘어나 에러 확률이 높아집니다.
### 2.3 정확도 상승
#### Overlapping Pooling Layer

#### Local Response Normalization(LRN) 사용
![image](https://user-images.githubusercontent.com/67731178/127152788-955b4e9b-0af7-4187-ab15-f3ea12d11565.png)

이 기법은 AlexNet에서 처음 도입되었습니다. 활성화 함수를 적용하기 전에 Normalization을 적용하여 함수의 결과값에서 더 좋은 일반화 결과를 도출했습니다. 
LRN은 사용하는 이유는 이미지의 인접화소들을 억제시키고 특징을 부각시키기 위함입니다. 그 결과, 정확도가 1.4% 향상되었습니다. 
LRN은 신경생물학에서 그 원리를 가져왔습니다. 예컨대, 밝은 빛을 보면 눈이 어두워진다거나, 특정 사물에 집중하면 그 부분만 집중하여 보이게 되는 현상입니다.

## 3. 모델 설명
파라미터 : 약 6200만개

연산량 : 약 6억 3000만개

convolution layer : 5개

pooling layer : 3개

Local Response Normalization layer : 2개

fully-connected layer : 3개

총 layer : 8개

![image](https://user-images.githubusercontent.com/67731178/127152328-b8a6ab36-d709-4e54-aa65-7521f26fa55b.png)
AlexNet은 총 8개의 층으로 구성되어 있습니다. 첫 5개 층은 Convolution, 그 뒤 3개 층은 Fully-Connected 층입니다. 각각의 층들은 하나의 이미지에 대해 독립적으로 특징을 추출하여(Feature Extraction) 가중치를 조정함으로써 필터를 학습시킵니다. 층별로 어떤 역할을 하는지 살펴보겠습니다.

- 1~2층은 Max Pooling 층입니다. 이를 통해 데이터의 중요한 요소들만 요약하여 추출합니다.
- 3~5층은 서로 직접 연결되어 중간다리 역할을 합니다.
- 5층 뒤에는 Max Pooling 층이 뒤따르는데, 이곳의 출력은 Fully Connected 층 두 개로 구성됩니다. 1~5층에서 학습된 데이터들은 Fully Connected 층에서 분류됩니다.
- 최종적으로는 1000 class label이 있는 Softmax 분류기로 분류됩니다.

## 4. 결론

AlexNet에서 사용된 기법들은 지금은 비교적 보편화되었으나 2012년 논문 발표 당시에는 매우 생소한 개념이었습니다. 또한 오늘날 사용하고 있는 딥러닝 구조들은 AlexNet에서 계승 되었다고 해도 과언이 아닙니다.

발전과제 : AlexNet에서의 최적의 hyper-parameter의 조합을 찾아 성능 높여만 함.

참고자료:
