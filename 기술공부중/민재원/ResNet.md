# ResNet

[참고 논문](https://arxiv.org/abs/1512.03385)


![Resnet 2015](https://user-images.githubusercontent.com/87637394/127270468-997b0083-a12f-4834-8f7c-4fe0915f490d.JPG)
ILSVRC 2015에서 우승한 MODEL이다. by Microsoft

## ResNet의 가장 큰 특징은 3가지로 요약할 수 있다.

1. 층 수가 깊다. 구조마다 다르지만 152개 층을 가지기도 한다.

2. 기존에 Loss Function에 대하여 그대로 사용하지 않고 Loss Function의 Residual을 사용하게 된다.

3. 기본적으로 VGG-19 구조를 기본 뼈대로 가져간다.

### 1. 층 수가 깊다. 구조마다 다르지만 152개 층을 가지기도 한다.
![residual과 plain method의 차이](https://user-images.githubusercontent.com/87637394/127270882-b7ac35cc-1c94-45c4-b780-633ccd8e4416.jpeg)

- 기본적으로 깊다. 2014년 GoogLeNet 22개 층. 
- 당연히 Architecture은 깊을 수록 더 높은 성능을 낼 가능성이 높다. 그러나 비용적인 면에서, 그리고 Overfitting 문제 때문에 무조건 깊게 한다고 해서 능사가 아니다.

### 2-1. 기존에 Loss Function에 대하여 그대로 사용하지 않고 Loss Function의 Residual을 사용하게 된다.
![Resnet 기존 방식 차이점](https://user-images.githubusercontent.com/87637394/127271097-ad5f1e9c-c868-47fc-8c78-5446da82c211.JPG)

- ResNet과 기존 방식의 차이점은 Residual의 사용이다. F(x) = H(x) - x, 즉 잔차 (Residual)로 정의하게 되고 잔차를 최소화하는 방향으로 학습하게 된다.
- (기존 방식은 H(x) 자체를 학습시키는 방법이다.)
- 잔차를 학습시키게 되면 개념적으로 오류에 대해서 좀 더 집중적인 학습이 가능하다는 장점이 있다. 
- 잔차를 학습시키기 위해 Input 값으로 들어가는 x를 Output Layer의 Shortcut의 형태로 제공하게 된다. 이것이 Residual Block의 가장 큰 특징이다.

### 2-2. Residual 방식이 왜 유효한가?
- 일반적으로 Residual 방식을 쓰지 않는 네트워크를 plain method라고 한다. AlexNet, VGGNet이 대표적
- 일반 네트워크는 네트워크가 더 깊을 때 Gradient가 소실되거나 폭발하는 문제가 발생 when back propagation
- 가중치 레이어에 소실되는 그라디언트가 있더라도, 이전 레이어로 전환할 수 있는 x가 존재하기 때문에 Residual 방식이 유효하다고 한다.


### 2-3. ResNet 구조 설명
![Resnet구조](https://user-images.githubusercontent.com/87637394/127274210-3c835410-7c9b-431a-bf7f-1c9b92ed0ab4.png)
- 위 그림은 ResNet 아키텍처를 보여준다.

ResNet의 경우, 3가지 유형의 스킵/바로 가기 연결이 있다.
1. 바로 가기는, 차원을 늘리기 위한 추가 제로 패딩으로, identity 매핑을 수행하므로 추가 매개 변수가 필요 없음
2. projection 바로 가기는 차수를 늘리는 데만 사용되며, 다른 바로 가기는 동일합니다. 추가 매개 변수가 필요
3. 모든 바로 가기는 projection임. 추가 파라미터는 2. 보다 더 많음.

### 3. 기본적으로 VGG-19 구조를 기본 뼈대로 가져간다.
- VGG-19의 구조를 뼈대로 한다. 거기에 컨볼루션 층들을 추가해서 깊게 만든 후에, shortcut들을 추가한다. (#1의 그림 참고)
- plain 네트워크는 망이 깊어지면서 오히려 에러가 커진다. 34층의 plain 네트워크가 18층의 plain 네트워크보다 성능이 나쁘다. 
- ResNet은 망이 깊어지면서 에러도 역시 작아진다. shortcut을 연결해서 잔차(residual)를 최소가 되게 학습한 효과가 있다는 것이다. 
- 그 중 성능을 평가한 결과 152층의 ResNet이 가장 성능이 뛰어났다.
![resnet 152](https://user-images.githubusercontent.com/87637394/127271929-154830e6-5beb-4a7c-b63c-dd5b5c1c5ea7.JPG)
- 참고로 ResNet-152는 VGG16/19보다 복잡성이 낮다.

### 그 외 a. Bottleneck 구조
- 네트워크가 깊어 시간 복잡도가 높다는 문제 존재 => bottle neck으로 복잡성을 줄일 수 있음.
- bottleneck 구현 : 네트워크의 시작과 끝에 아래 오른쪽 그림과 같이 1x1 conv layer가 추가됨. (GoogLeNet에서 제안된 기술과 같음.)
- ![bottleneck in resnet](https://user-images.githubusercontent.com/87637394/127274676-d1c20416-73e7-4d52-b87f-53582dc4d150.JPG)
- 네트워크의 성능을 크게 저하시키지 안흥면서 매개변수 수를 줄일 수 있음.

### 그 외 b. 학습 속도
- Residual Block은 CNN에 필수적인 것은 아님. 다만 Error Back Propagation 단계에서 학습을 더 빠르게 하는 효과를 가지고 있어 학습 속도를 향상시킬 수 있는 장점 때문에 많이 사용한다.

### 그 외 c. ResNet의 결합 모델

### 그 외 d. ResNet의 특성과 단점



