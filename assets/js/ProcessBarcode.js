$(document).ready(function() {
	
	$("#default").hide();
	$('#prod-table-list').append( "<li style='height: 60px'><span class='name'>Cocacola</span><span class='price'> <i class='fa fa-inr'></i>249</span><span class='remove' style='float: right ; margin-right: 8px '><button type='button' class='btn btn-danger' style=' line-heigth: 15px ; padding: 5px 10px'>Remove</button></span></li>" );
	$("#costCalculate").show();
	calculateTotal();

	//$("#costCalculate").hide();
	var apikey = "0a273047-a7a5-4d79-b752-bc381fe7afbb";
	var postocrurl = "https://api.idolondemand.com/1/api/sync/recognizebarcodes/v1";

	$('#addProduct').click( function() {
	   fnCall();  
	});
	
    $("#input1").change(function(){
        fnCall();
    });
	
	$( document ).on( "click", "span.remove", function() {
		//alert($(this).parent().prop("tagName"));
		$(this).parent().remove();
		calculateTotal();
    });
	
	
	//var out = document.getElementById("output");

	function fnCall(){	
		//out.innerHTML = "1";
		
		var filesList1 = document.getElementById("input1");
		var file1 = filesList1.files[0];
		var reader = new FileReader();
        reader.onload = function (e) {
			$('#blah').attr('src', e.target.result);
		}
		reader.readAsDataURL(input1.files[0]);
		if(!file1){
			alert('You must select a file.');
			return false;
		}
		
		var fd = new FormData();
		fd.append("apikey", apikey);  
		fd.append("file", file1);
		// optional to improve results from 'scene photos'
		// sometimes depending on the quality of the image
		// you need to turn this on for improved results
		//fd.append("mode", "scene_photo");
		
		xhr = new XMLHttpRequest();
		xhr.open('POST', postocrurl, true);	
		xhr.onreadystatechange = function(){
			//out.innerHTML = "onreadystatechange...";
			
			var r = fnReady();	
		};
		xhr.onload = function(){ };
		//out.innerHTML = "Waiting for response...<br><br>";
		xhr.send(fd);     
		
	}

	function fnReady() {
		if (xhr.readyState === 4) {
			//out.innerHTML += "<br>status: "+xhr.status+": "+xhr.statusText+"<br>";
			var response = xhr.responseText;
			if(response) {
                alert(response);
				//out.innerHTML += "responseText:<br>"+r+"<br><br>";
				jsonResponse =  eval('(' + response + ')');
                $("#barcode_detail").html(jsonResponse);
				var barcodeNo = jsonResponse.barcode[0].text;
				addProducts(barcodeNo);
			}else {
				//out.innerHTML += "Error: no response.<br>";
				alert("Error: No Response.. Please Try Again!");
			}
		} 
		else {
			/* out.innerHTML = "xhr.readyState: "+xhr.readyState;
			if(xhr.readyState == 2) {
				tempAlert("Processing Your Request", 1000);
			}
			if(xhr.readyState == 3) {
				tempAlert("Processing Complete", 1000);
			} */
		}
	}

	function addProducts(barcodeValue){        
		if(barcodeValue == '0300676270401') {
			var imgurl = "http://www.novartisotc.com/upc.jpg";
			var name = "Excedrin® and NoDoz® Alertness Aid";
			var desc = "Novartis Consumer Health (NCH) Drug products which contains stray tablets, capsules, or caplets from other products, or contain broken or chipped tablets.";
			var price = "2240";
		}
		else if(barcodeValue == '5000108030539') {
			var imgurl = "https://www.idolondemand.com/sample-content/barcode/bc6.jpg";
			var name = "The Ultimate Book";
			var desc = "A Popular Novel By an Author.";
			var price = "1599";
		}
		else if(barcodeValue == '5449000000996') {
			var imgurl = "https://www.idolondemand.com/sample-content/barcode/bc7.jpg";
			var name = "CocaCola";
			var desc = "Cool your Thirst.";
			var price = "249";
		}
		else if(barcodeValue == '5036905007146') {
			var imgurl = "https://www.idolondemand.com/sample-content/barcode/bc4.jpg";
			var name = "Playing Card";
			var desc = "A common TimePass.";
			var price = "399";
		}
		else if(barcodeValue == 'CHNI0321') {
			var imgurl = "";
			var name = "iMac Connector";
			var desc = "Cable Connector.";
			var price = "2379";
		}
		else {
			var imgurl = "https://www.idolondemand.com/sample-content/barcode/bc9.jpg";
			var name = "Sample Product";
			var desc = "A sample and example Product.";
			var price = "789";
		}
		// Creating a pop-up dialog about the product
		$(function() {
			$( "#prod-desc-dialog" ).dialog({
				buttons: [
					{
						text: "Add It",
						icons: {
							primary: "ui-icon-heart"
						},
						click: function() {
							$( this ).dialog( "close" );
							$('#default').hide();
							$('#prod-table-list').append( "<li style='height: 60px'><span class='name'>"+ name +" " +"</span><span><i class='fa fa-inr'></i></span><span class='price'> "+ price +"</span><span class='remove' style='float: right ; margin-right: 8px '><button type='button' class='btn btn-danger' style=' line-heigth: 15px ; padding: 5px 10px'>Remove</button></span></li>" );
							$("#costCalculate").show();
							calculateTotal();
						}
						//showText: false
					},
					{
						text: "Ignore",
						icons: {
							primary: "ui-icon-heart"
						},
						click: function() {
							$( this ).dialog( "close" );
						}
						// Uncommenting the following line would hide the text, resulting in the label being used as a tooltip
						//showText: false
					}
				],
				height: 450,
				position: {my: "", of: window}
				//width: 700
			});
			var queryData = {
				'query': barcodeValue,
				'docs':'2',
				'offset':'0',
				'list': {
					'Date':'no'
				}
			};
			/* $.ajax({
				type: "POST",
				url: "https://api-eu.clusterpoint.com/100627/smartshoppee/_search.json", // set your URL here
				data: queryData
            }).done(function( response ) {
				// do something with the received data/response
				alert(response);
			}); */
			
			$('#prod-desc').html("<div><img src='"+imgurl+"' style='height: 150px ; width: 100%' /></div><div>Product: "+name+"</div><div>Desc:"+desc+"</div><div>Price: "+price+"</div>");
		});
	}
	
	function calculateTotal() {
		$('#prod-table').each(function() {
			// this is inner scope, in reference to the .phrase element
			var totalProdCost = 0;
			$(this).find('li').each(function(){
				// cache jquery var
				var current = $(this);
				totalProdCost += parseInt(current.find( "span.price" ).text());
			});
			$("#totalCost").html("<h4>" + totalProdCost + "</h4>");
		});
	}
	
	function replaceAll(string, find, replace) {
	  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}
	function escapeRegExp(string) {
		return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
});