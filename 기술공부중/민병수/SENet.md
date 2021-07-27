# SENet, Squeeze-and-Excitation Networks 논문
https://openaccess.thecvf.com/content_cvpr_2018/papers/Hu_Squeeze-and-Excitation_Networks_CVPR_2018_paper.pdf


## SENet과 기존 모델과의 비교
![image](https://user-images.githubusercontent.com/77095328/127130493-47c78dd4-03d9-4f76-8cc7-e3eadb0cdae8.png)

**SENet 논문은 기존 어떤 모델에도 적용될 수 있는 SE block이라는 것을 제안했습니다. VGGNet, GoogLeNet, ResNet 등에 SE block을 첨가함으로써 성능 향상을 도모한 것입니다. 성능은 꽤 많이 향상되는 반면, hyperparameter는 많이 늘지 않기 때문에, 연산량 증가는 크지 않습니다. 보통 성능 향상을 시키려면 연산량도 그만큼 엄청나게 증가되는데, SENet의 경우 연산량은 크게 늘지 않으면서도 분류 정확도를 높일 수 있기 때문에 SE block을 사용하는 것은 효율적이라고 볼 수 있습니다.**

SENet은 채널간의 상호작용에 집중하여 성능을 끌어올린 모델입니다. 채널 간의 상호작용은 가중치로 생각해볼 수 있습니다. 가중치가 큰 채널은 중요한 특징을 담고있다는 의미로 해석할 수 있습니다. 피쳐맵의 각 채널마다 가중치를 부여하여 피쳐맵의 각 채널에 곱합니다. 즉, SENet은 채널 간의 가중치를 계산하여 성능을 끌어올린 모델로 생각해 볼 수 있습니다. 이제 이 가중치를 어떻게 계산하는지 알아보도록 하겠습니다.

![image](https://user-images.githubusercontent.com/77095328/127130721-43c6396a-47f7-4ea5-833b-7cda67c7e038.png)

위 그림은 SB Block(Squeeze(압축) + Excitation(재조정))을 통해 채널별 가중치를 계산하고 피쳐맵에 곱해지는 모습을 나타냅니다. 색으로 표현된 가중치가 피쳐맵과 곱해져 피쳐맵의 색도 바뀌었다.

SENet은 SE Block을 활용하는 모델입니다. SE Block은 CNN 기반 모델에 부착하여 사용합니다. residual 모델 또는 Inception 모델과 함께 사용할 수 있습니다. 또한 VGGnet에도 부착하여 사용할 수 있습니다. 이처럼 SE Block은 유연성을 지니고 있습니다. 재밌는 점은 low-level에서 SE Block은 클래스 상관없이 중요한 특징을 추출하고, High-level에서는 클래스와 관련있는 특징들을 추출한다네요.


 ## SE Block을 살펴보겠습니다. SE Block은 Squeeze(압축), Excitation(재조정) 두 과정으로 구성됩니다. 
 
 ![image](https://user-images.githubusercontent.com/77095328/127130913-482b0e26-9aa0-4163-93c9-f4b3ce4c29e7.png)


##### (1) Squeeze(압축)
 각 채널별 가중치를 계산하기 위해서는 우선, 각 채널을 1차원으로 만들어야 합니다. 예를 들어, 3채널이 있으면 [0.6, 0.1, 0.7]로 표기를 해야 가중치를 나타낼 수 있습니다. Squeeze는 각 채널을 1차원으로 만드는 역할(압축)을 합니다. 
 
 ![image](https://user-images.githubusercontent.com/77095328/127134192-3d9e81f6-f373-4a08-9056-828422a79e96.png)


 Squeeze는 conv 연산을 통해 생성된 피쳐맵을 입력으로 받습니다. HxWxC 크기의 피쳐맵을 global average pooling 연산을 통해 (1x1xC)로 압축합니다. 피처맵의 한 채널에 해당하는 픽셀 값을 모두 다 더한 다음에, HXW로 나누어 1x1x1로 압축합니다. 피쳐맵은 C개의 채널을 갖고 있으므로 다 연결하면 (1x1xC)가 됩니다. (H = Height, W = Width, C = Color)
생성된 (1x1xC) 벡터는 Excitation으로 전달됩니다.

C개 채널의 2차원(HxW)의 특성맵들을 1x1 사이즈의 특성맵으로 변환해주는 것입니다. 간단히 global average pooling (GAP)을 통해 각 2차원의 특성맵을 평균내어 하나의 값을 얻습니다.

##### (2) Excitation(재조정)
  Excitation은 Squeeze에서 생성된 (1x1xC)벡터를 정규화하여 가중치를 부여하는 역할을 합니다.

 Excitation은 **FC1 - ReLU - FC2 - Sigmoid**로 구성됩니다. FC1에 (1x1xC)백터가 입력되어, C 채널을 C/r개 채널로 축소합니다. r은 하이퍼파라미터 입니다. 연산량 제한과 일반화효과 떄문에 **bottleneck 구조를 선택**했다. C/r개 채널로 축소되어 (1x1xC/r)가 된 벡터는 ReLU로 전달되고, FC2를 통과합니다. FC2는 채널 수를 다시 C로 되돌립니다. 그리고 Sigmoid를 거쳐서 [0에서1) 범위의 값을 지니게 됩니다. 마지막으로, 피쳐맵과 곱해져 피쳐맵의 채널에 가중치를 가합니다. 
 
 ![image](https://user-images.githubusercontent.com/77095328/127140739-08488f42-317f-45e0-a288-f57ec1f64d8d.png)

σ는 시그모이드함수이고, δ는 ReLU 함수입니다. 위 공식을 살펴보자면, 먼저 스퀴즈를 통해 얻은 z을 인풋으로 삼아서 W1 가중치들과 fully-connected하게 곱해줍니다. 그래서 얻은 값을 δ, 즉 ReLU 함수로 활성화해준 후에 W2 가중치들과 fully-connected하게 곱해줍니다. 그렇게 얻은 값을 σ, 즉 시그모이드 함수로 활성화해줘서 0과 1사이의 값을 갖게 합니다. 따라서 각 채널의 상대적 중요도를 0과 1의 값으로 파악할 수 있게 됩니다.

SENet은 ResNext-5-에 부착되어 만들어짐, 즉 ResNext기반 모델

## 기존 모델과의 성능 분석
![image](https://user-images.githubusercontent.com/77095328/127141045-6850773c-8ea4-4acb-b013-7919a39b04a0.png)

위 표에서 original은 original 논문에서 얻은 결과를, re-implementation은 저자들이 직접 실험해서 얻은 결과를, SENet은 SE block을 첨가해서 얻은 결과를 각각 나타냅니다. 이 표를 통해 알 수 있는 것은 SE block을 첨가했을 때 항상 top-1 error와 top-5 error를 낮췄다는 것입니다. 그리고 알고리즘의 복잡도는 크게 증가하지 않았다는 것도 GFLOPs 열에서 알 수 있습니다. 

 

SENet이 출시된 당시 최신 알고리즘들과 이미지넷에서의 성능을 비교한 표는 다음과 같습니다. SENet-154는 SE block을 개정된 ResNeXt와 통합한 것을 의미합니다. SENet-154가 그당시 최신 모델들보다 우월한 성능을 보임을 아래 표를 통해 알 수 있습니다. 
![image](https://user-images.githubusercontent.com/77095328/127141146-75150e7f-3f3f-444d-9abf-b70e2e23fe22.png)




+ **FC1 = VGGNet16에서 14번째 레이어를 의미 7 x 7 x 512의 특성맵을 flatten 해준다. flatten이라는 것은 전 층의 출력을 받아서 단순히 1차원의 벡터로 펼쳐주는 것을 의미한다. 결과적으로 7 x 7 x 512 = 25088개의 뉴런이 되고, fc1층의 4096개의 뉴런과 fully connected 된다. 훈련시 dropout이 적용된다.**

+ **FC2 = VGGNet16에서 15층을 의미함. 4096개의 뉴런으로 구성해준다. fc1층의 4096개의 뉴런과 fully connected 된다. 훈련시 dropout이 적용된다.**

+ **Relu = ReLU 함수는 정류 선형 유닛(영어: Rectified Linear Unit 렉티파이드 리니어 유닛)에 대한 함수이다. ReLU는 입력값이 0보다 작으면 0으로 출력, 0보다 크면 입력값 그대로 출력하는 유닛인데, 그 함수는 다음과 같다. ![image](https://user-images.githubusercontent.com/77095328/127138430-26439053-8aeb-46d6-baac-6fd8551758a5.png)**

+ **Sigmoid = Sigmoid 함수는 S자와 유사한 완만한 시그모이드 커브 형태를 보이는 함수입니다. Sigmoid는 대표적인 Logistic 함수입니다. Sigmoid 함수는 모든 실수 입력 값을 0보다 크고 1보다 작은 미분 가능한 수로 변환하는 특징을 갖습니다. 모든 입력에 대하여 sigmoid는 S와 같은 형태로 미분 가능한 0~1 사이의 값을 반환하기에 Logistic Classification과 같은 분류 문제의 가설과 비용 함수(Cost Function)1에 많이 사용됩니다. sigmoid의 반환 값은 확률형태이기 때문에 결과를 확률로 해석할 때 유용합니다. ![image](https://user-images.githubusercontent.com/77095328/127138858-0935fe1e-fdd0-4608-b243-c8f57f530fdb.png)**
