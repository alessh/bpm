'use strict';
var BpmnModdle = require('bpmn-moddle');
var moddle = new BpmnModdle();

var aws = require('aws-sdk');
var async = require('async');
var dynamodb = new aws.DynamoDB.DocumentClient();

//var msg = require('msg');

var assign = require('lodash/assign');
var omit = require('lodash/omit');

/*String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};*/

module.exports.deploy = (event, context, callback) => {
  /*
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      event: event,
    }),
  };

  callback(null, response);

  return;
  */

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
  /*
  var xmlStr =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" id="empty-definitions" targetNamespace="http://bpmn.io/schema/bpmn">' +
  '</bpmn2:definitions>';
  */

  moddle.fromXML(
    event.body, 
    //getProcessXML(),
    //xmlStr,
    function(err, definitions) {

    if (err) {
      console.log('Error: ' + err);
      callback(err);
    }

    //console.log(JSON.stringify(definitions, null, 2));

    // update id attribute
    //definitions.set('id', 'NEW ID');

    // add a root element
    //var bpmnProcess = moddle.create('bpmn:Process', { id: 'MyProcess_1' });
    //definitions.get('rootElements').push(bpmnProcess);

    // xmlStrUpdated contains new id and the added process
    definitions.get('rootElements').filter( (k) => k.$type === 'bpmn:Process').forEach( (process) => {

      var params = {
        'TableName': 'bpmn',
        'Item': omit(assign(process, {type: process.$type}), ['$type'])
      }

      dynamodb.put(params, function(err, data) {
        if (err) callback(err)
      }); 

      async.forEachOf(process.flowElements, function(value, key, asyncCallback) {

        //Object.assign(value, {type: value.$type});

        console.log(JSON.stringify(value, null, 2));

        var params = {
          'TableName': 'bpmn',
          'Item': omit(assign(value, {type: value.$type, process: process.id}), ['$type'])
        }

        dynamodb.put(params, function(err, data) {
          asyncCallback(err, data);
        });  

      }, function(err) {
        if (err) callback(err);
        //callback(err, 'Done.'); 
        /*if (err) {
          msg.error(err, callback);
        } else {
          callback(err, 'Done.'); 
        }*/

      })
    });

    /*moddle.toXML(definitions, function(err, xmlStrUpdated) {

    });*/

    callback(null, {
      statusCode: 200,
      body: 'XML processado com sucesso !'
    })
  });

};


function getProcessXML() {

  return '<?xml version="1.0" encoding="UTF-8"?>'+
'<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="1.0.0">'+
'  <bpmn:collaboration id="Collaboration_0h1a0eh">'+
'    <bpmn:participant id="Participant_0mt9ef2" name="Financeiro" processRef="Process_1" />'+
'    <bpmn:participant id="Participant_0jp6ena" name="Comercial" processRef="Process_0ue24sb" />'+
'  </bpmn:collaboration>'+
'  <bpmn:process id="Process_1" isExecutable="true">'+
'    <bpmn:laneSet>'+
'      <bpmn:lane id="Lane_0jqkdzm">'+
'        <bpmn:flowNodeRef>EndEvent_0jhk4cl</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>StartEvent_0iub7n2</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>EndEvent_1xyjz1m</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>StartEvent_0jcb7cd</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>UserTask_1dhvngf</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>EndEvent_0avuiap</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>UserTask_0x5xfn0</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>UserTask_0nkiexp</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>UserTask_0ogfu0d</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>UserTask_0nf9wod</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>UserTask_0niuleh</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>UserTask_06mp9zx</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>ExclusiveGateway_1yckhu1</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>StartEvent_0l707uq</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>ExclusiveGateway_0x2iitj</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>Task_05vco99</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>EndEvent_0w6shux</bpmn:flowNodeRef>'+
'        <bpmn:flowNodeRef>StartEvent_0uca1hs</bpmn:flowNodeRef>'+
'      </bpmn:lane>'+
'    </bpmn:laneSet>'+
'    <bpmn:startEvent id="StartEvent_0jcb7cd">'+
'      <bpmn:outgoing>SequenceFlow_1hf2p7p</bpmn:outgoing>'+
'    </bpmn:startEvent>'+
'    <bpmn:userTask id="UserTask_1dhvngf" name="Conferência das Duplicatas">'+
'      <bpmn:incoming>SequenceFlow_1ek6art</bpmn:incoming>'+
'      <bpmn:incoming>SequenceFlow_1hf2p7p</bpmn:incoming>'+
'      <bpmn:outgoing>SequenceFlow_0ol8fyn</bpmn:outgoing>'+
'    </bpmn:userTask>'+
'    <bpmn:endEvent id="EndEvent_0avuiap">'+
'      <bpmn:incoming>SequenceFlow_0ol8fyn</bpmn:incoming>'+
'    </bpmn:endEvent>'+
'    <bpmn:userTask id="UserTask_0x5xfn0" name="Ordem de Desconto">'+
'      <bpmn:incoming>SequenceFlow_0x8rtjt</bpmn:incoming>'+
'      <bpmn:outgoing>SequenceFlow_07o7wl0</bpmn:outgoing>'+
'    </bpmn:userTask>'+
'    <bpmn:userTask id="UserTask_0nkiexp" name="Enviar a ordem de desconto para o banco">'+
'      <bpmn:incoming>SequenceFlow_07o7wl0</bpmn:incoming>'+
'      <bpmn:outgoing>SequenceFlow_1dp3jti</bpmn:outgoing>'+
'    </bpmn:userTask>'+
'    <bpmn:userTask id="UserTask_0ogfu0d" name="Ordem Efetivada (Emite Bordero)">'+
'      <bpmn:incoming>SequenceFlow_1dp3jti</bpmn:incoming>'+
'      <bpmn:outgoing>SequenceFlow_1dgn2w3</bpmn:outgoing>'+
'      <bpmn:outgoing>SequenceFlow_066nn11</bpmn:outgoing>'+
'    </bpmn:userTask>'+
'    <bpmn:endEvent id="EndEvent_0jhk4cl">'+
'      <bpmn:incoming>SequenceFlow_1dgn2w3</bpmn:incoming>'+
'    </bpmn:endEvent>'+
'    <bpmn:userTask id="UserTask_0nf9wod" name="Custodia em Carteira (Conciliação Bancária)">'+
'      <bpmn:incoming>SequenceFlow_0arza53</bpmn:incoming>'+
'      <bpmn:outgoing>SequenceFlow_0dklbbh</bpmn:outgoing>'+
'    </bpmn:userTask>'+
'    <bpmn:startEvent id="StartEvent_0iub7n2" name="Conciliação Cobrança e Descontos">'+
'      <bpmn:outgoing>SequenceFlow_0sktqzz</bpmn:outgoing>'+
'    </bpmn:startEvent>'+
'    <bpmn:userTask id="UserTask_0niuleh" name="Resumo Contas a Receber">'+
'      <bpmn:incoming>SequenceFlow_16l3zzd</bpmn:incoming>'+
'      <bpmn:incoming>SequenceFlow_0dklbbh</bpmn:incoming>'+
'      <bpmn:outgoing>SequenceFlow_0v9bv5s</bpmn:outgoing>'+
'    </bpmn:userTask>'+
'    <bpmn:endEvent id="EndEvent_1xyjz1m">'+
'      <bpmn:incoming>SequenceFlow_0v9bv5s</bpmn:incoming>'+
'    </bpmn:endEvent>'+
'    <bpmn:userTask id="UserTask_06mp9zx" name="Conciliação Bancária (Baixa, Prorrogação, etc...)">'+
'      <bpmn:incoming>SequenceFlow_0sktqzz</bpmn:incoming>'+
'      <bpmn:incoming>SequenceFlow_066nn11</bpmn:incoming>'+
'      <bpmn:outgoing>SequenceFlow_16l3zzd</bpmn:outgoing>'+
'    </bpmn:userTask>'+
'    <bpmn:sequenceFlow id="SequenceFlow_1hf2p7p" sourceRef="StartEvent_0jcb7cd" targetRef="UserTask_1dhvngf" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_1ek6art" sourceRef="StartEvent_0uca1hs" targetRef="UserTask_1dhvngf" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_0ol8fyn" sourceRef="UserTask_1dhvngf" targetRef="EndEvent_0avuiap" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_0s69yxh" sourceRef="StartEvent_0l707uq" targetRef="ExclusiveGateway_0x2iitj" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_0x8rtjt" sourceRef="ExclusiveGateway_1yckhu1" targetRef="UserTask_0x5xfn0" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_0arza53" sourceRef="ExclusiveGateway_1yckhu1" targetRef="UserTask_0nf9wod" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_07o7wl0" sourceRef="UserTask_0x5xfn0" targetRef="UserTask_0nkiexp" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_1dp3jti" sourceRef="UserTask_0nkiexp" targetRef="UserTask_0ogfu0d" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_1dgn2w3" sourceRef="UserTask_0ogfu0d" targetRef="EndEvent_0jhk4cl" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_066nn11" sourceRef="UserTask_0ogfu0d" targetRef="UserTask_06mp9zx" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_0dklbbh" sourceRef="UserTask_0nf9wod" targetRef="UserTask_0niuleh" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_0sktqzz" sourceRef="StartEvent_0iub7n2" targetRef="UserTask_06mp9zx" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_16l3zzd" sourceRef="UserTask_06mp9zx" targetRef="UserTask_0niuleh" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_0v9bv5s" sourceRef="UserTask_0niuleh" targetRef="EndEvent_1xyjz1m" />'+
'    <bpmn:exclusiveGateway id="ExclusiveGateway_1yckhu1" name="Cliente aceita descontar duplicatas ?">'+
'      <bpmn:incoming>SequenceFlow_19q8iur</bpmn:incoming>'+
'      <bpmn:outgoing>SequenceFlow_0x8rtjt</bpmn:outgoing>'+
'      <bpmn:outgoing>SequenceFlow_0arza53</bpmn:outgoing>'+
'    </bpmn:exclusiveGateway>'+
'    <bpmn:sequenceFlow id="SequenceFlow_19q8iur" sourceRef="ExclusiveGateway_0x2iitj" targetRef="ExclusiveGateway_1yckhu1" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_0eju9of" sourceRef="ExclusiveGateway_0x2iitj" targetRef="Task_05vco99" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_0dtswgd" sourceRef="Task_05vco99" targetRef="EndEvent_0w6shux" />'+
'    <bpmn:startEvent id="StartEvent_0l707uq" name="Desconto de Duplicatas">'+
'      <bpmn:outgoing>SequenceFlow_0s69yxh</bpmn:outgoing>'+
'    </bpmn:startEvent>'+
'    <bpmn:exclusiveGateway id="ExclusiveGateway_0x2iitj" name="Pedido tem SINAL">'+
'      <bpmn:incoming>SequenceFlow_0s69yxh</bpmn:incoming>'+
'      <bpmn:outgoing>SequenceFlow_19q8iur</bpmn:outgoing>'+
'      <bpmn:outgoing>SequenceFlow_0eju9of</bpmn:outgoing>'+
'    </bpmn:exclusiveGateway>'+
'    <bpmn:task id="Task_05vco99" name="Demonstrativo de Comissão sobre o SINAL">'+
'      <bpmn:incoming>SequenceFlow_0eju9of</bpmn:incoming>'+
'      <bpmn:outgoing>SequenceFlow_0dtswgd</bpmn:outgoing>'+
'    </bpmn:task>'+
'    <bpmn:endEvent id="EndEvent_0w6shux">'+
'      <bpmn:incoming>SequenceFlow_0dtswgd</bpmn:incoming>'+
'    </bpmn:endEvent>'+
'    <bpmn:startEvent id="StartEvent_0uca1hs" name="Pedido Liberado">'+
'      <bpmn:outgoing>SequenceFlow_1ek6art</bpmn:outgoing>'+
'      <bpmn:messageEventDefinition messageRef="Message_1yb4ytv" />'+
'    </bpmn:startEvent>'+
'    <bpmn:textAnnotation id="TextAnnotation_1mljdzr">    <bpmn:text>Neuci confere os venctos de acordo com as restrições de pagamento informado nas observações do pedido e faz os ajustes nas datas se necessário, tambem informa se o cliente não aceita desconto. Exemplo: cliente só paga as quartas-feiras, cliente vai pagar numa data específica.</bpmn:text>'+
'</bpmn:textAnnotation>'+
'    <bpmn:textAnnotation id="TextAnnotation_0csy24l">    <bpmn:text>Rita abre uma nova Ordem de Desconto e informa para qual banco deve ser enviado a duplicata</bpmn:text>'+
'</bpmn:textAnnotation>'+
'    <bpmn:textAnnotation id="TextAnnotation_197gv3v">    <bpmn:text>Marisa executa a ordem enviando a duplicata para o banco, confere o CEP e end, preenche bairro se necessário. Numa segunda etapa este envio pode ser feito via CNAB</bpmn:text>'+
'</bpmn:textAnnotation>'+
'    <bpmn:association id="Association_0t1pnnd" sourceRef="UserTask_1dhvngf" targetRef="TextAnnotation_1mljdzr" />'+
'    <bpmn:association id="Association_1wxdx0i" sourceRef="UserTask_0x5xfn0" targetRef="TextAnnotation_0csy24l" />'+
'    <bpmn:association id="Association_14cv273" sourceRef="UserTask_0nkiexp" targetRef="TextAnnotation_197gv3v" />'+
'    <bpmn:association id="Association_1vprtzi" sourceRef="UserTask_1dhvngf" targetRef="TextAnnotation_1i0gpmw" />'+
'    <bpmn:textAnnotation id="TextAnnotation_1i0gpmw">    <bpmn:text>Verificar se o Pedido tem Diferencial de ICMS e acrescentar uma parcela no valor</bpmn:text>'+
'</bpmn:textAnnotation>'+
'    <bpmn:textAnnotation id="TextAnnotation_1iix6pg">    <bpmn:text>Diferenciar Duplicatas Entregues das NÃO Entregues</bpmn:text>'+
'</bpmn:textAnnotation>'+
'    <bpmn:association id="Association_0vgrthr" sourceRef="UserTask_0nf9wod" targetRef="TextAnnotation_1iix6pg" />'+
'    <bpmn:association id="Association_15w7a4b" sourceRef="Task_05vco99" targetRef="TextAnnotation_0fitd83" />'+
'    <bpmn:textAnnotation id="TextAnnotation_0fitd83">    <bpmn:text><![CDATA[Somente Pedidos com SINAL (Valor do Produtos)'+
'* IRON paga sinal com 15 dias]]></bpmn:text>'+
'</bpmn:textAnnotation>'+
'  </bpmn:process>'+
'  <bpmn:message id="Message_1yb4ytv" name="PEDIDO_LIBERADO" />'+
'  <bpmn:process id="Process_0ue24sb" isExecutable="false">'+
'    <bpmn:startEvent id="StartEvent_1" name="Recebimento do Pedido">'+
'      <bpmn:outgoing>SequenceFlow_16whiax</bpmn:outgoing>'+
'    </bpmn:startEvent>'+
'    <bpmn:startEvent id="StartEvent_1bcn9fx" name="Recebimento do Pedido">'+
'      <bpmn:outgoing>SequenceFlow_1p1ltff</bpmn:outgoing>'+
'      <bpmn:messageEventDefinition />'+
'    </bpmn:startEvent>'+
'    <bpmn:userTask id="UserTask_012tkfl" name="Entrada do Pedido">'+
'      <bpmn:incoming>SequenceFlow_16whiax</bpmn:incoming>'+
'      <bpmn:incoming>SequenceFlow_1p1ltff</bpmn:incoming>'+
'      <bpmn:outgoing>SequenceFlow_08qp03j</bpmn:outgoing>'+
'    </bpmn:userTask>'+
'    <bpmn:userTask id="UserTask_0erupl0" name="Liberação do Pedido">'+
'      <bpmn:incoming>SequenceFlow_08qp03j</bpmn:incoming>'+
'      <bpmn:outgoing>SequenceFlow_0zqvp43</bpmn:outgoing>'+
'    </bpmn:userTask>'+
'    <bpmn:intermediateThrowEvent id="IntermediateThrowEvent_0x0yy9x" name="Pedido Liberado">'+
'      <bpmn:incoming>SequenceFlow_0zqvp43</bpmn:incoming>'+
'      <bpmn:messageEventDefinition messageRef="Message_1yb4ytv" camunda:type="external" camunda:topic="pedido" />'+
'    </bpmn:intermediateThrowEvent>'+
'    <bpmn:sequenceFlow id="SequenceFlow_16whiax" sourceRef="StartEvent_1" targetRef="UserTask_012tkfl" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_1p1ltff" sourceRef="StartEvent_1bcn9fx" targetRef="UserTask_012tkfl" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_08qp03j" sourceRef="UserTask_012tkfl" targetRef="UserTask_0erupl0" />'+
'    <bpmn:sequenceFlow id="SequenceFlow_0zqvp43" sourceRef="UserTask_0erupl0" targetRef="IntermediateThrowEvent_0x0yy9x" />'+
'    <bpmn:textAnnotation id="TextAnnotation_0jvhspm">    <bpmn:text>CEP importante informar o CEP correto, pois o banco rejeita a duplicata se não bater o end. com o CEP</bpmn:text>'+
'</bpmn:textAnnotation>'+
'    <bpmn:association id="Association_02wbljf" sourceRef="UserTask_012tkfl" targetRef="TextAnnotation_0jvhspm" />'+
'  </bpmn:process>'+
'  <bpmndi:BPMNDiagram id="BPMNDiagram_1">'+
'    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0h1a0eh">'+
'      <bpmndi:BPMNShape id="Participant_0mt9ef2_di" bpmnElement="Participant_0mt9ef2">'+
'        <dc:Bounds x="126" y="130" width="1342" height="653" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_07o7wl0_di" bpmnElement="SequenceFlow_07o7wl0">'+
'        <di:waypoint xsi:type="dc:Point" x="611" y="440" />'+
'        <di:waypoint xsi:type="dc:Point" x="733" y="440" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="630" y="380" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="StartEvent_0l707uq_di" bpmnElement="StartEvent_0l707uq">'+
'        <dc:Bounds x="244" y="422" width="36" height="36" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="217" y="458" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNShape id="TextAnnotation_0jvhspm_di" bpmnElement="TextAnnotation_0jvhspm">'+
'        <dc:Bounds x="627" y="-96" width="368" height="41" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNShape id="TextAnnotation_1mljdzr_di" bpmnElement="TextAnnotation_1mljdzr">'+
'        <dc:Bounds x="569" y="144" width="710" height="51" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNShape id="EndEvent_0avuiap_di" bpmnElement="EndEvent_0avuiap">'+
'        <dc:Bounds x="654" y="208" width="36" height="36" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="627" y="244" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="Association_0t1pnnd_di" bpmnElement="Association_0t1pnnd">'+
'        <di:waypoint xsi:type="dc:Point" x="479" y="186" />'+
'        <di:waypoint xsi:type="dc:Point" x="479" y="163" />'+
'        <di:waypoint xsi:type="dc:Point" x="567" y="163" />'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_0ol8fyn_di" bpmnElement="SequenceFlow_0ol8fyn">'+
'        <di:waypoint xsi:type="dc:Point" x="529" y="226" />'+
'        <di:waypoint xsi:type="dc:Point" x="654" y="226" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="726" y="80" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="StartEvent_1bcn9fx_di" bpmnElement="StartEvent_1bcn9fx">'+
'        <dc:Bounds x="245" y="41" width="36" height="36" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="218" y="77" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_08qp03j_di" bpmnElement="SequenceFlow_08qp03j">'+
'        <di:waypoint xsi:type="dc:Point" x="528" y="7" />'+
'        <di:waypoint xsi:type="dc:Point" x="616" y="7" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="518" y="-18" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_1p1ltff_di" bpmnElement="SequenceFlow_1p1ltff">'+
'        <di:waypoint xsi:type="dc:Point" x="281" y="59" />'+
'        <di:waypoint xsi:type="dc:Point" x="346" y="59" />'+
'        <di:waypoint xsi:type="dc:Point" x="346" y="7" />'+
'        <di:waypoint xsi:type="dc:Point" x="428" y="7" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="316" y="22" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">'+
'        <dc:Bounds x="245" y="-66" width="36" height="36" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="218" y="-30" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_16whiax_di" bpmnElement="SequenceFlow_16whiax">'+
'        <di:waypoint xsi:type="dc:Point" x="281" y="-48" />'+
'        <di:waypoint xsi:type="dc:Point" x="346" y="-48" />'+
'        <di:waypoint xsi:type="dc:Point" x="346" y="7" />'+
'        <di:waypoint xsi:type="dc:Point" x="428" y="7" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="278" y="-73" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="ExclusiveGateway_1yckhu1_di" bpmnElement="ExclusiveGateway_1yckhu1" isMarkerVisible="true">'+
'        <dc:Bounds x="418" y="415" width="50" height="50" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="417" y="359" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_0s69yxh_di" bpmnElement="SequenceFlow_0s69yxh">'+
'        <di:waypoint xsi:type="dc:Point" x="280" y="440" />'+
'        <di:waypoint xsi:type="dc:Point" x="327" y="440" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="261" y="415" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="EndEvent_0jhk4cl_di" bpmnElement="EndEvent_0jhk4cl">'+
'        <dc:Bounds x="1162" y="422" width="36" height="36" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="1135" y="458" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_0x8rtjt_di" bpmnElement="SequenceFlow_0x8rtjt">'+
'        <di:waypoint xsi:type="dc:Point" x="468" y="440" />'+
'        <di:waypoint xsi:type="dc:Point" x="511" y="440" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="382" y="415" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="TextAnnotation_0csy24l_di" bpmnElement="TextAnnotation_0csy24l">'+
'        <dc:Bounds x="510" y="494" width="286" height="40" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="Association_1wxdx0i_di" bpmnElement="Association_1wxdx0i">'+
'        <di:waypoint xsi:type="dc:Point" x="611" y="457" />'+
'        <di:waypoint xsi:type="dc:Point" x="645" y="457" />'+
'        <di:waypoint xsi:type="dc:Point" x="645" y="494" />'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="TextAnnotation_197gv3v_di" bpmnElement="TextAnnotation_197gv3v">'+
'        <dc:Bounds x="834" y="323" width="488" height="52" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="Association_14cv273_di" bpmnElement="Association_14cv273">'+
'        <di:waypoint xsi:type="dc:Point" x="783" y="399" />'+
'        <di:waypoint xsi:type="dc:Point" x="783" y="365" />'+
'        <di:waypoint xsi:type="dc:Point" x="834" y="359" />'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_0arza53_di" bpmnElement="SequenceFlow_0arza53">'+
'        <di:waypoint xsi:type="dc:Point" x="443" y="465" />'+
'        <di:waypoint xsi:type="dc:Point" x="443" y="722" />'+
'        <di:waypoint xsi:type="dc:Point" x="511" y="722" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="320" y="712" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="StartEvent_0iub7n2_di" bpmnElement="StartEvent_0iub7n2">'+
'        <dc:Bounds x="853" y="623" width="36" height="36" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="826" y="659" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_0sktqzz_di" bpmnElement="SequenceFlow_0sktqzz">'+
'        <di:waypoint xsi:type="dc:Point" x="889" y="641" />'+
'        <di:waypoint xsi:type="dc:Point" x="971" y="640" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="228" y="737" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_16l3zzd_di" bpmnElement="SequenceFlow_16l3zzd">'+
'        <di:waypoint xsi:type="dc:Point" x="1071" y="640" />'+
'        <di:waypoint xsi:type="dc:Point" x="1207" y="640" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="704" y="841" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="EndEvent_1xyjz1m_di" bpmnElement="EndEvent_1xyjz1m">'+
'        <dc:Bounds x="1359" y="623" width="36" height="36" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="1332" y="659" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_0v9bv5s_di" bpmnElement="SequenceFlow_0v9bv5s">'+
'        <di:waypoint xsi:type="dc:Point" x="1307" y="640" />'+
'        <di:waypoint xsi:type="dc:Point" x="1359" y="641" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="831" y="989" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_0dklbbh_di" bpmnElement="SequenceFlow_0dklbbh">'+
'        <di:waypoint xsi:type="dc:Point" x="611" y="722" />'+
'        <di:waypoint xsi:type="dc:Point" x="1257" y="722" />'+
'        <di:waypoint xsi:type="dc:Point" x="1257" y="681" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="889" y="624" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_1dp3jti_di" bpmnElement="SequenceFlow_1dp3jti">'+
'        <di:waypoint xsi:type="dc:Point" x="833" y="440" />'+
'        <di:waypoint xsi:type="dc:Point" x="971" y="440" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="872" y="415" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_1dgn2w3_di" bpmnElement="SequenceFlow_1dgn2w3">'+
'        <di:waypoint xsi:type="dc:Point" x="1071" y="440" />'+
'        <di:waypoint xsi:type="dc:Point" x="1162" y="440" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="1072" y="415" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_066nn11_di" bpmnElement="SequenceFlow_066nn11">'+
'        <di:waypoint xsi:type="dc:Point" x="1021" y="480" />'+
'        <di:waypoint xsi:type="dc:Point" x="1021" y="571" />'+
'        <di:waypoint xsi:type="dc:Point" x="1021" y="571" />'+
'        <di:waypoint xsi:type="dc:Point" x="1021" y="601" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="971" y="546" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="UserTask_0x5xfn0_di" bpmnElement="UserTask_0x5xfn0">'+
'        <dc:Bounds x="511" y="400" width="100" height="80" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNShape id="UserTask_06mp9zx_di" bpmnElement="UserTask_06mp9zx">'+
'        <dc:Bounds x="971" y="601" width="100" height="80" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNShape id="UserTask_0niuleh_di" bpmnElement="UserTask_0niuleh">'+
'        <dc:Bounds x="1207" y="601" width="100" height="80" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNShape id="UserTask_0nf9wod_di" bpmnElement="UserTask_0nf9wod">'+
'        <dc:Bounds x="511" y="683" width="100" height="80" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNShape id="UserTask_1dhvngf_di" bpmnElement="UserTask_1dhvngf">'+
'        <dc:Bounds x="429" y="186" width="100" height="80" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNShape id="UserTask_0erupl0_di" bpmnElement="UserTask_0erupl0">'+
'        <dc:Bounds x="616" y="-33" width="100" height="80" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNShape id="UserTask_012tkfl_di" bpmnElement="UserTask_012tkfl">'+
'        <dc:Bounds x="428" y="-33" width="100" height="80" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNShape id="UserTask_0nkiexp_di" bpmnElement="UserTask_0nkiexp">'+
'        <dc:Bounds x="733" y="400" width="100" height="80" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNShape id="UserTask_0ogfu0d_di" bpmnElement="UserTask_0ogfu0d">'+
'        <dc:Bounds x="971" y="400" width="100" height="80" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_1ek6art_di" bpmnElement="SequenceFlow_1ek6art">'+
'        <di:waypoint xsi:type="dc:Point" x="309" y="252" />'+
'        <di:waypoint xsi:type="dc:Point" x="369" y="252" />'+
'        <di:waypoint xsi:type="dc:Point" x="369" y="226" />'+
'        <di:waypoint xsi:type="dc:Point" x="429" y="226" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="324" y="201" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_0zqvp43_di" bpmnElement="SequenceFlow_0zqvp43">'+
'        <di:waypoint xsi:type="dc:Point" x="716" y="7" />'+
'        <di:waypoint xsi:type="dc:Point" x="793" y="7" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="710" y="-18" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="IntermediateThrowEvent_0x0yy9x_di" bpmnElement="IntermediateThrowEvent_0x0yy9x">'+
'        <dc:Bounds x="793" y="-11" width="36" height="36" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="766" y="25" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNShape id="StartEvent_0jcb7cd_di" bpmnElement="StartEvent_0jcb7cd">'+
'        <dc:Bounds x="273" y="182" width="36" height="36" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="246" y="218" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_1hf2p7p_di" bpmnElement="SequenceFlow_1hf2p7p">'+
'        <di:waypoint xsi:type="dc:Point" x="309" y="200" />'+
'        <di:waypoint xsi:type="dc:Point" x="369" y="200" />'+
'        <di:waypoint xsi:type="dc:Point" x="369" y="226" />'+
'        <di:waypoint xsi:type="dc:Point" x="429" y="226" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="339" y="188" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="Participant_0jp6ena_di" bpmnElement="Participant_0jp6ena">'+
'        <dc:Bounds x="126" y="-110" width="1341" height="228" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="Association_02wbljf_di" bpmnElement="Association_02wbljf">'+
'        <di:waypoint xsi:type="dc:Point" x="478" y="-33" />'+
'        <di:waypoint xsi:type="dc:Point" x="478" y="-75" />'+
'        <di:waypoint xsi:type="dc:Point" x="627" y="-75" />'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="Lane_0jqkdzm_di" bpmnElement="Lane_0jqkdzm">'+
'        <dc:Bounds x="156" y="130" width="1312" height="653" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNShape id="ExclusiveGateway_0x2iitj_di" bpmnElement="ExclusiveGateway_0x2iitj" isMarkerVisible="true">'+
'        <dc:Bounds x="327.2544910179641" y="415" width="50" height="50" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="307.2544910179641" y="382" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_19q8iur_di" bpmnElement="SequenceFlow_19q8iur">'+
'        <di:waypoint xsi:type="dc:Point" x="377" y="440" />'+
'        <di:waypoint xsi:type="dc:Point" x="418" y="440" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="346" y="415" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="Task_05vco99_di" bpmnElement="Task_05vco99">'+
'        <dc:Bounds x="302" y="525.7095808383233" width="100" height="80" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_0eju9of_di" bpmnElement="SequenceFlow_0eju9of">'+
'        <di:waypoint xsi:type="dc:Point" x="352" y="465" />'+
'        <di:waypoint xsi:type="dc:Point" x="352" y="496" />'+
'        <di:waypoint xsi:type="dc:Point" x="352" y="496" />'+
'        <di:waypoint xsi:type="dc:Point" x="352" y="526" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="310" y="544" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="EndEvent_0w6shux_di" bpmnElement="EndEvent_0w6shux">'+
'        <dc:Bounds x="334" y="648" width="36" height="36" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="307" y="684" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="SequenceFlow_0dtswgd_di" bpmnElement="SequenceFlow_0dtswgd">'+
'        <di:waypoint xsi:type="dc:Point" x="352" y="606" />'+
'        <di:waypoint xsi:type="dc:Point" x="352" y="628" />'+
'        <di:waypoint xsi:type="dc:Point" x="352" y="628" />'+
'        <di:waypoint xsi:type="dc:Point" x="352" y="648" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="310" y="676.5" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="TextAnnotation_1i0gpmw_di" bpmnElement="TextAnnotation_1i0gpmw">'+
'        <dc:Bounds x="691" y="271" width="483" height="30" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="Association_1vprtzi_di" bpmnElement="Association_1vprtzi">'+
'        <di:waypoint xsi:type="dc:Point" x="529" y="240" />'+
'        <di:waypoint xsi:type="dc:Point" x="687" y="286" />'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="TextAnnotation_1iix6pg_di" bpmnElement="TextAnnotation_1iix6pg">'+
'        <dc:Bounds x="588" y="612" width="220" height="50" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="Association_0vgrthr_di" bpmnElement="Association_0vgrthr">'+
'        <di:waypoint xsi:type="dc:Point" x="610" y="692" />'+
'        <di:waypoint xsi:type="dc:Point" x="657" y="662" />'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="TextAnnotation_0fitd83_di" bpmnElement="TextAnnotation_0fitd83">'+
'        <dc:Bounds x="488" y="551" width="402" height="30" />'+
'      </bpmndi:BPMNShape>'+
'      <bpmndi:BPMNEdge id="Association_15w7a4b_di" bpmnElement="Association_15w7a4b">'+
'        <di:waypoint xsi:type="dc:Point" x="402" y="566" />'+
'        <di:waypoint xsi:type="dc:Point" x="483" y="566" />'+
'      </bpmndi:BPMNEdge>'+
'      <bpmndi:BPMNShape id="StartEvent_0uca1hs_di" bpmnElement="StartEvent_0uca1hs">'+
'        <dc:Bounds x="273" y="234" width="36" height="36" />'+
'        <bpmndi:BPMNLabel>'+
'          <dc:Bounds x="246" y="270" width="90" height="20" />'+
'        </bpmndi:BPMNLabel>'+
'      </bpmndi:BPMNShape>'+
'    </bpmndi:BPMNPlane>'+
'  </bpmndi:BPMNDiagram>'+
'</bpmn:definitions>';
  

}