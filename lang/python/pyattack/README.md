# PyAttck experiments

In a `pipenv shell`, we open a python repl and
paste

``` python
from pyattck import Attck

attack = Attck()

for technique in attack.enterprise.techniques:
    print(technique.id)
    print(technique.name)
    for subtechnique in technique.subtechniques:
        print(subtechnique.id)
        print(subtechnique.name)
```

This is explained in

``` text
https://github.com/swimlane/pyattck
```
