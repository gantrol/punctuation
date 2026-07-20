import { describe, expect, it } from 'vitest';
import { punctuationToChinese } from './index';
import { DoNotChange, baseCase, baseCaseAllTrueResult, checkItemsAllTrue } from './testdata';

const suppliedArticle = `# 一直都有新编程

每隔一二十年,就有人宣布"编程快要消失了"。它从没消失,只是一次次换了模样——而且每次换模样,上一代程序员都会摇头:这不算编程。

最早的程序是一卷纸带。程序员用打孔机在纸带上打出一排排小孔:有孔是一,没孔是零,机器读到什么就做什么。那时的"输入"是几千个孔,每一个都由人亲手决定,错一个,整卷作废。人对机器说的话必须一字不差,机器也绝不多做一个字。控制是百分之百的,代价也是百分之百:所有细节都压在人身上。

后来有了高级语言。你写一行"把这句话打印出来",编译器替你展开成几十条机器指令。这是人第一次偷懒:只负责说清逻辑,细节交给机器补全。当年的老程序员很看不惯,觉得真正的程序员就该直接写机器码。但趋势没有回头。

再后来出现了 SQL 这类语言,更进一步:连"怎么做"都不说了,只说"我要什么"——把所有下过单的客户找出来。至于先查哪张表、怎么查,数据库自己想办法。人退一步,机器进一步。

然后就到了大模型。如果把训练大模型也算作编程——它确实是,目的同样是让机器获得某种行为——那这就是有史以来最激进的一次换模样,输入和输出都变得面目全非。

先看输入。程序员不再写规则,而是给例子:上万亿字的文本,加一个简单的目标——预测下一个字。对比一下:纸带上几千个孔,孔孔性命攸关;语料里上万亿个字,随手删掉一万句,模型毫无感觉。以前给机器的是命令,一句顶一句;现在给机器的是示范,靠海量重复"泡"出一个大概。精确让位给了冗余。

再看输出。过去编程的产物是代码:人写的,每一行都读得懂,出了错能查到是哪一行。现在的产物是几千亿个数字,也就是权重。没有一个数字出自人手,也没有一个数字人能读懂——你无法指着其中某一个说"它管礼貌""它管算术"。程序第一次变成了连作者也无法阅读的东西。

程序跑起来之后,变化同样彻底。老程序像自动售货机:投几个币,出一罐可乐,能投什么、能出什么,事先定得死死的,而且每次分毫不差。大模型像一个人:你可以对它说任何话,它也可能回任何话;同一个问题,问两次答案未必相同。计算从"每次一样"变成了"大概率差不多",这在计算机历史上是头一回。

最有意思的是提示词。绕了一大圈,我们又回到了打字:对机器敲一行字,论信息量还不如一卷纸带。但杠杆完全不同了。纸带上改一个孔,只改一条指令;提示词里换一个词——把"你是客服"换成"你是诗人"——整台机器就换了一副性格。因为这行字不是写在白纸上,而是拨动在万亿参数铺好的底座上。字还是那些字,底下垫的东西厚了万亿倍。

把几十年连起来看,主线只有一条:人对机器说的话越来越少、越来越含糊,机器自己拿主意的部分越来越多。从"每个比特都是我定的",到"逻辑是我定的",到"要什么是我定的",再到"例子是我挑的"——人一路后退,交出的是细节,换来的是杠杆:每退一步,能做成的事就大一个量级,顺带失去一分"每次都一样"的确定。

所以别问编程会不会消失。它只会再一次变得让上一代人认不出来。一直都有新编程——而新编程的样子,从来都不像编程。`;

const suppliedArticleExpected = `# 一直都有新编程

每隔一二十年，就有人宣布“编程快要消失了”。它从没消失，只是一次次换了模样——而且每次换模样，上一代程序员都会摇头：这不算编程。

最早的程序是一卷纸带。程序员用打孔机在纸带上打出一排排小孔：有孔是一，没孔是零，机器读到什么就做什么。那时的“输入”是几千个孔，每一个都由人亲手决定，错一个，整卷作废。人对机器说的话必须一字不差，机器也绝不多做一个字。控制是百分之百的，代价也是百分之百：所有细节都压在人身上。

后来有了高级语言。你写一行“把这句话打印出来”，编译器替你展开成几十条机器指令。这是人第一次偷懒：只负责说清逻辑，细节交给机器补全。当年的老程序员很看不惯，觉得真正的程序员就该直接写机器码。但趋势没有回头。

再后来出现了 SQL 这类语言，更进一步：连“怎么做”都不说了，只说“我要什么”——把所有下过单的客户找出来。至于先查哪张表、怎么查，数据库自己想办法。人退一步，机器进一步。

然后就到了大模型。如果把训练大模型也算作编程——它确实是，目的同样是让机器获得某种行为——那这就是有史以来最激进的一次换模样，输入和输出都变得面目全非。

先看输入。程序员不再写规则，而是给例子：上万亿字的文本，加一个简单的目标——预测下一个字。对比一下：纸带上几千个孔，孔孔性命攸关；语料里上万亿个字，随手删掉一万句，模型毫无感觉。以前给机器的是命令，一句顶一句；现在给机器的是示范，靠海量重复“泡”出一个大概。精确让位给了冗余。

再看输出。过去编程的产物是代码：人写的，每一行都读得懂，出了错能查到是哪一行。现在的产物是几千亿个数字，也就是权重。没有一个数字出自人手，也没有一个数字人能读懂——你无法指着其中某一个说“它管礼貌”“它管算术”。程序第一次变成了连作者也无法阅读的东西。

程序跑起来之后，变化同样彻底。老程序像自动售货机：投几个币，出一罐可乐，能投什么、能出什么，事先定得死死的，而且每次分毫不差。大模型像一个人：你可以对它说任何话，它也可能回任何话；同一个问题，问两次答案未必相同。计算从“每次一样”变成了“大概率差不多”，这在计算机历史上是头一回。

最有意思的是提示词。绕了一大圈，我们又回到了打字：对机器敲一行字，论信息量还不如一卷纸带。但杠杆完全不同了。纸带上改一个孔，只改一条指令；提示词里换一个词——把“你是客服”换成“你是诗人”——整台机器就换了一副性格。因为这行字不是写在白纸上，而是拨动在万亿参数铺好的底座上。字还是那些字，底下垫的东西厚了万亿倍。

把几十年连起来看，主线只有一条：人对机器说的话越来越少、越来越含糊，机器自己拿主意的部分越来越多。从“每个比特都是我定的”，到“逻辑是我定的”，到“要什么是我定的”，再到“例子是我挑的”——人一路后退，交出的是细节，换来的是杠杆：每退一步，能做成的事就大一个量级，顺带失去一分“每次都一样”的确定。

所以别问编程会不会消失。它只会再一次变得让上一代人认不出来。一直都有新编程——而新编程的样子，从来都不像编程。`;

describe('punctuationToChinese', () => {
	describe('established behavior', () => {
		it.each(DoNotChange)('does not change protected text: %s', (text) => {
			expect(punctuationToChinese(text, checkItemsAllTrue)).toBe(text);
		});

		it('replaces punctuation in the original base case', () => {
			expect(punctuationToChinese(baseCase, checkItemsAllTrue)).toBe(baseCaseAllTrueResult);
		});

		it('leaves unchecked punctuation unchanged', () => {
			expect(punctuationToChinese('你好,世界.', { ',': true })).toBe('你好，世界.');
		});
	});

	describe('individual punctuation marks', () => {
		it.each([
			['comma', '前,后', '前，后'],
			['full stop', '结束.', '结束。'],
			['colon', '说明:内容', '说明：内容'],
			['semicolon', '第一;第二', '第一；第二'],
			['question mark', '真的吗?', '真的吗？'],
			['exclamation mark', '太好了!', '太好了！'],
			['parentheses', '(重要)内容', '（重要）内容'],
			['square brackets', '[重点]内容', '【重点】内容'],
			['double quotes', '他说"你好"', '他说“你好”'],
			['single quotes', "所谓'原则'", '所谓‘原则’'],
			['ellipsis', '等等...', '等等……']
		])('converts %s next to Chinese text', (_name, input, expected) => {
			expect(punctuationToChinese(input, checkItemsAllTrue)).toBe(expected);
		});
	});

	describe('Chinese prose regressions', () => {
		it('converts the supplied article without leaving English punctuation behind', () => {
			expect(punctuationToChinese(suppliedArticle, checkItemsAllTrue)).toBe(
				suppliedArticleExpected
			);
		});

		it.each([
			['punctuation after closing quotes', '从"每个比特",到"逻辑".', '从“每个比特”，到“逻辑”。'],
			['quotes after a line break', '他说:\n"你好!"', '他说：\n“你好！”'],
			[
				'quotes around Latin text',
				'所谓"prompt engineering",其实并不神秘.',
				'所谓“prompt engineering”，其实并不神秘。'
			],
			[
				'punctuation after closing parentheses',
				'重点(尤其重要),请记住.',
				'重点（尤其重要），请记住。'
			],
			[
				'punctuation after Latin words',
				'这个工具支持 JavaScript,也支持 TypeScript.',
				'这个工具支持 JavaScript，也支持 TypeScript。'
			],
			['consecutive punctuation', '真的吗?! 别急!!', '真的吗？！ 别急！！'],
			['a minus sign before a number', '温度降到-3°C,请注意.', '温度降到-3°C，请注意。'],
			[
				'sentence punctuation after an address',
				'版本 2.1.0 已发布,服务监听 127.0.0.1:5173.',
				'版本 2.1.0 已发布，服务监听 127.0.0.1:5173。'
			]
		])('handles %s', (_name, input, expected) => {
			expect(punctuationToChinese(input, checkItemsAllTrue)).toBe(expected);
		});
	});

	describe('technical and non-Chinese contexts', () => {
		it.each([
			['pure English prose', 'He said, "Wait... really?!"', 'He said, "Wait... really?!"'],
			[
				'an apostrophe in an English contraction',
				"这个词是 don't,不要改.",
				"这个词是 don't，不要改。"
			],
			[
				'inline code',
				'请运行 `console.log("你好,world...")`,然后继续.',
				'请运行 `console.log("你好,world...")`，然后继续。'
			],
			[
				'a Markdown link',
				'详情见[项目文档](https://example.com/docs),然后继续.',
				'详情见[项目文档](https://example.com/docs)，然后继续。'
			],
			[
				'an ellipsis inside a URL',
				'访问 https://example.com/a...b,然后继续.',
				'访问 https://example.com/a...b，然后继续。'
			]
		])('preserves %s while converting surrounding Chinese prose', (_name, input, expected) => {
			expect(punctuationToChinese(input, checkItemsAllTrue)).toBe(expected);
		});

		it('preserves a fenced code block', () => {
			const input = `示例:
\`\`\`js
console.log("你好,world...");
\`\`\`
继续.`;
			const expected = `示例：
\`\`\`js
console.log("你好,world...");
\`\`\`
继续。`;

			expect(punctuationToChinese(input, checkItemsAllTrue)).toBe(expected);
		});

		it.each([
			['a function expression', '函数 f(x),很常见.', '函数 f(x)，很常见。'],
			['a command-line flag', '运行 --dry-run,然后继续.', '运行 --dry-run，然后继续。'],
			['a Windows path', '文件在 C:\\temp\\a.txt,请查看.', '文件在 C:\\temp\\a.txt，请查看。']
		])('preserves %s in Chinese prose', (_name, input, expected) => {
			expect(punctuationToChinese(input, checkItemsAllTrue)).toBe(expected);
		});
	});
});
