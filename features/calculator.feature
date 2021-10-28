Feature: Test online calculator scenarios
Scenario Outline: Test Division, Subtraction, Addition
Given Open chrome browser and start application
When I enter following values and operator
			|value1 | <value1>|
			|value2 | <value2>|
			|operator | <operator>|			
Then I should be able to see result
			|<testcase>| <expected>|		
Examples:
		| value1  		| value2 		| operator			| expected	|  testcase|
    	| 	2 			|   1			|		/			| 2			|	case 1  |
    	| 	1			|   2			|		/			| 0.5		|	case 2   |
		| 	12.5		|   0.5			|		/			| 25		|	case 3   |
		| 	999999999	|   999999999	|		/			| 1			|	case 4	   |
		| 	-999999999	|   999999999	|		/			| -1		|	case 5	   |				
		| 	0			|   99			|		/			|0			|	case 6	   |
		| 	99			|   0			|		/			| error		|	case 7	   |
		| 	123			|   456			|		+			| 579		|	case 8	   |
		| 	999999999	|   999999999	|		+			| 2e+9		|	case 9	   |
    	| 	-9			|   3			|		+			| -6 		|	case 10	   |
		| 	-999999999	|  999999999	|		+			|0			|	case 11	   |
		| 	1.2			|   3.4			|		+			| 4.6		|	case 12	   |
		| 	123			|   0			|		+			| 123		|	case 13	   |
		| 	456			|   123			|		-			| 333		|	case 14	   |
		| 	123			|   456			|		-			| -333		|	case 15	   |
		| 	999999999 	|   999999999	|		-			| 0			|	case 16	   |
    	| 	-2			|   1			|		-			| -3		|	case 17	   |
		| 	3			|   0			|		-			| 3			|	case 18	   |