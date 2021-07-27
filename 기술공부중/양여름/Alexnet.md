# CNN의 발전, 모델 정리 1. AlexNet
## 0. 개요
![image](https://user-images.githubusercontent.com/67731178/127153824-f0f9f484-876d-4181-9ccf-d531f61e438b.png)

AlexNet(2012)   
GPU, ReLU함수 사용하면서, 깊은 네트워크(8Layer) 학습하여 성능 상승(오차율 16.4%)

## 1. 동기
고해상도 이미지에 대규모로 Convolutional Neural Network를 적용하기에는 여전히 많은 연산량 소모   
이와 함께 적은 데이터셋 있으니, 과적합을 막아야 했다.

## 2. 핵심 아이디어

### 2.1 학습 최적화

#### ReLU 활성화 함수

![image](https://user-images.githubusercontent.com/67731178/127152666-264aa79e-9720-4087-b524-f84c65850b1a.png)

ReLU는 최근까지도 가장 보편적으로 쓰이는 활성화 함수입니다. AlexNet에서도 ReLU를 사용하면 tanh함수에 비해 학습 속도가 최고 6배까지 빠릅니다.  
연산비용이 크지 않고 구현이 매우 간단합니다. 
> 활성화 함수란?   
> 신경망 회로에서, 한 노드에 대해 입력값을 다음 노드에 보낼지 말지에 대해 결정하는 함수이다. 선형함수를 사용할 시 층을 깊게 하는 의미가 줄어들어 주로 비선형 함수로 되어있다.   
> 참고자료 : https://m.blog.naver.com/good5229/221752705030

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
![image](https://user-images.githubusercontent.com/67731178/127153390-7d417490-f329-45e3-b860-8646e2121c31.png)

다른 CNN 모델에서 Pooling은 일반적으로 필터를 겹치지 않게 Stride를 적절히 조정하여 사용합니다. 그러나 AlexNet에서는 Stride를 좁혀 Overlapping 하는 구조를 만들었습니다. 이 경우, 정확도는 약 0.4%가 향상되지만 Overlapping의 사용은 연상량을 증가시켰습니다.
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

참고자료: https://www.datamaker.io/posts/34/ , https://warm-uk.tistory.com/44

***

# CNN의 발전, 모델 정리 2. VGGNet
## 0. 개요
![image](https://user-images.githubusercontent.com/67731178/127153824-f0f9f484-876d-4181-9ccf-d531f61e438b.png)

VGGNet은 옥스포드 대학의 연구팀에 의해 개발된 모델로써, 2014년 ILSVRC에서 준우승한 모델입니다. 이 모델은 이전에 혁신적으로 평가받던 AlexNet이 나온지 2년만에 다시 한 번 오차율 면에서 큰 발전을 보여줬습니다.

위 그림은 2010년부터 2015년까지 ILSVRC에서 CNN 모델들이 보여준 오차율과 층(layer)의 깊이를 나타냅니다. VGG가 등장한 2014년에는 그 전 모델보다 층의 깊이가 확연히 증가했다는 특징이 있습니다. 심지어 15년 모델은 152개 층을 가졌는데, 이를 통해 CNN의 층이 깊어질 수록 성능이 좋아진다는 것을 추론할 수 있습니다.
![image](https://user-images.githubusercontent.com/67731178/127158915-2f340d7a-dd46-4b3d-8f87-c8171da16286.png)

> 논문 : https://arxiv.org/pdf/1409.1556v6.pdf   
> 논문 요약
> * ILSVRC 2014 대회에서 2등을 차지한, Karen Simonyan과 Andrew Zisserman이 만든 CNN 모델
> * VGGNet은 네트워크의 깊이가 모델이 좋은 성능을 보이는 데 중요한 역할을 한다는 것을 보여줌
> * VGGNet의 필터 크기는 3x3, stride 1, 제로 패딩 1의 Conv 레이어로 이루어져 있으며, 필터 크기 2x2 (패딩 없음)의 Max-pool을 Pooling 레이어로 사용함
> * ILSVRC 대회에서는 GoogLeNet 보다 이미지 분류 성능은 낮았지만, 다른 연구에서는 좋은 성능을 보임. (논문의 Appendix에서 확인할 수 있음)
> * 최근에는 이미지 특징(feature)을 추출하는 데 이용되는 등 기본 네트워크 모델로 활용되고 있음
> * 매우 많은 메모리를 이용하여 연산한다는 단점이 있음

![image](https://user-images.githubusercontent.com/67731178/127154423-d0b56fae-2369-4d5a-af1d-87fdd67adbcb.png)

## 1. 동기 (기존의 문제)

*더 깊은 네트워크를 형성하기 위해*, 단순하고 작은 필터 크기를 적용해야만 했다.

그래야 파라미터 수가 즐어들고 학습속도 향상된다.

(하지만 16layer를 넘어가면 별 이득이 없음.)


## 2. 핵심 아이디어
* 실험
![image](https://user-images.githubusercontent.com/67731178/127155420-c4c0affb-8ac1-46c9-9978-e5a18df02891.png)

VGGNet의 원본 논문에서는 네트워크의 깊이를 깊게 조절하는 것이 CNN의 성능에 어떤 영향을 주는지 확인하고자 했습니다. 이를 위해 연구진은 필터의 크기를 (3x3)으로 설정하여 이미지의 사이즈가 금방 축소되는 것을 막고 CNN의 깊이를 충분히 깊게 만들었습니다. 그림에서 'conv3-64'는 해당 층에서 (3x3) 필터 64개로 합성곱 연산이 수행된다는 것을 의미합니다. 또한 이러한 방법으로 총 6개의 구조(A, A-LRN, B, C, D, E)를 만들어 깊이에 따른 성능을 비교했습니다.

실험 과정에서 첫번째로 A(11층)과 A-LRN 두 구조의 성능을 비교했을 때 유의미한 효과가 없다는 것을 확인하였습니다. 이를 바탕으로 B 구조부터는 LRN을 적용하지 않고 층의 깊이만 늘려가는 식으로 성능을 비교했습니다. 그 결과, 층이 깊어질수록 이미지 분류 에러가 감소하는 것을 관찰할 수 있었습니다. 위에서 추론했던 것이 증명된 셈입니다.

### 2.1 단순한 네트워크 구조
![image](https://user-images.githubusercontent.com/67731178/127155816-1dc40b71-36ed-4fbb-a956-9cd5a1785ce5.png)


#### 모든 convolution layer에 "3x3 (stride 1, pad 1)" 필터 적용, 모든 pooling layer에 "2x2 (stride 2)" 적용
VGGNet은 (3x3) 필터를 사용합니다. 이론적으로는 (7x7) 필터를 한 번 사용하는 것과 동일한 성능을 보여야하지만, 연구진이 테스트한 결과 (3x3) 필터를 여러 번 사용하는 방법이 더 좋은 성능을 보였습니다. 그 이유로는 크게 두 가지 정도가 있습니다. 
* 필터의 중첩이 활성화 함수 ReLU를 더 많이 사용하도록 만들기 때문입니다. 이는 최종적으로 정보를 분류하는 결정 함수가 더 잘 학습하도록 영향을 끼칩니다. 
* (3x3) 필터를 사용하면 학습해야 할 파라미터의 수가 줄어들기 때문입니다. 이것은 자연스럽게 학습 속도에 긍정적 영향을 끼칩니다.

***
* 여기는 원리 설명 부분입니당.
![image](https://user-images.githubusercontent.com/67731178/127159527-12f872f2-e2ac-4f07-9927-074a9e5e115a.png)
![image](https://user-images.githubusercontent.com/67731178/127159545-d37eb01e-d70a-46fd-909e-0bec6d3b8500.png)

3x3필터를 이용할 경우 3-레이어 Convolution을 반복했을 때 원본 이미지의 7x7 영역을 수용할 수 있다.

* ReLU사용 증가   
각 Convolution 연산은 ReLU 함수를 포함한다. 다시 말해, 1-layer 7x7 필터링의 경우 한 번의 비선형 함수가 적용되는 반면 3-layer 3x3 필터링은 세 번의 비선형 함수가 적용된다. 따라서, 레이어가 증가함에 따라 비선형성이 증가하게 되고 이것은 모델의 특징 식별성 증가로 이어진다.

* 학습 파라미터 수 감소   
Convolutional Network 구조를 학습할 때, 학습 대상인 가중치(weight)는 필터의 크기에 해당한다.   
따라서, 7x7필터 1개에 대한 학습 파라미터 수는 49이고 3x3 필터 3개에 대한 학습 파라미터 수는 27(3x3x3)이 된다
***

따라서, 큰 필터를 갖는 Conv 레이어 보다 작은 필터로 여러 개의 Conv 레이어를 갖는 것이 더 적은 파라미터를 이용하면서 더 좋은 feature를 뽑을 수 있다. 

하지만, FC(Fully Connected) 레이어가 세 개이기 때문에, 파라미터가 너무 많아진다. (파라미터 수 약 1억2200만) 역전파(back propagation)를 할 때 Conv 레이어의 중간 결과를 저장하기 때문에 많은 메모리 공간을 차지한다는 단점이 있다. 


> VGGNet 팀은 3x3 convolution이라는 단순한 구조로부터 성능을 끌어내기 위해, training과 test에 많은 공을 들였으며, 다양한 경우에 성능이 어떻게 달라지는지 공개하여 CNN 구조 이해에 많은 기여를 하였다. 논문 3번 Classification framework 부분인데 논문을 더 자세히 읽으면서 공부하면 큰 도움이 될 듯 하다. (hyper-parameter 설정, traning image size, test image size 등)

## 3.모델 설명

파라미터 : 1억 3800만개

convolution layer : 13개

pooling layer : 5개

fully-connected layer : 3개

총 layer : 16개


## 4. 결론

### 모델의 단점
파라미터 개수가 너무 많다. 특히 fully-connected layer에서의 파라미터는 너무 많다. 따라서 학습시간이 엄청 오래걸린다. (Google Net은 FC가 없다. 파라미터의 개수가 5백만개 정도.)
해결책 : Avg pooling layer 사용 <- GoogleNet에서 적용

### 모델의 장점 
단순한 구조. 당시 성능이 가장 좋았던 모델은 GoogleNet이지만 그 구조가 복잡하여 사용하기 어렵다는 단점이 있었기 때문에 VGG보다 덜 회자되었다고 한다.   
그 결과, VGG를 기본 모델로 하는 수 많은 발전된 모델이 등장한다. (구조가 단순하여 이해나 변형이 쉽다.)

위와 같은 특징이 모든 경우에 좋은 방향으로 작용하는 것은 아니니 주의할 필요가 있다. 다시 말해, 무작정 네트워크의 깊이를 깊게 만드는 것이 장점만 있는 것은 아니다.
여러 레이어를 거쳐 만들어진 특징 맵(Feature Map)은 동일한 Receptive Field에 대해 더 추상적인 정보를 담게 된다. 목적에 따라서는 더 선명한 특징 맵이 필요할 수도 있다.

참고자료 https://codebaragi23.github.io/machine%20learning/1.-VGGNet-paper-review/
